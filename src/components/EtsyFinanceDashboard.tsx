'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import Papa from 'papaparse';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

type ParsedRow = {
  orderId: string;
  date: string;
  itemName: string;
  quantity: number;
  orderTotal: number;
  price: number;
  shipping: number;
  discount: number;
  shippingDiscount: number;
  feeStatement: number;
  salesTax: number;
};

type ItemRow = {
  orderId: string;
  date: string;
  itemName: string;
  quantity: number;
  price: number;
  shipping: number;
  discount: number;
  shippingDiscount: number;
};

type OrderRow = {
  orderId: string;
  date: string;
  orderValue: number;
  orderTotal: number;
  orderNet: number;
  shipping: number;
  discount: number;
  shippingDiscount: number;
  transactionFee: number;
  processingFee: number;
};

type StatementFee = {
  orderId: string;
  fee: number;
  isAd: boolean;
  isSalesTax: boolean;
};

type StatementSummary = {
  salesTotal: number;
  feesTotal: number;
  marketingTotal: number;
  otherTotal: number;
  refundTotal: number;
  netProfit: number;
};

const toNumber = (value: unknown) => {
  if (value === null || value === undefined) return 0;
  const cleaned = String(value).replace(',', '.').replace(/[^\d.-]/g, '');
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

const toQuantity = (value: unknown) => {
  const parsed = Number.parseFloat(String(value).replace(',', '.'));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const EtsyFinanceDashboard: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [adsFeesTotal, setAdsFeesTotal] = useState(0);
  const [otherFeesTotal, setOtherFeesTotal] = useState(0);
  const [refundsTotal, setRefundsTotal] = useState(0);
  const [statementSummary, setStatementSummary] = useState<StatementSummary | null>(null);

  const getValue = (row: Record<string, string>, keys: string[]) => {
    for (const key of keys) {
      if (row[key] !== undefined && row[key] !== '') return row[key];
    }
    return '';
  };

  const parseFile = (file: File) =>
    new Promise<{
      items: ItemRow[];
      orders: OrderRow[];
      statements: StatementFee[];
      adsFees: number;
      otherFees: number;
      salesTax: number;
      summary: StatementSummary | null;
    }>((resolve) => {
      Papa.parse<Record<string, string>>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data || [];
          if (!data.length) {
            resolve({
              items: [],
              orders: [],
              statements: [],
              adsFees: 0,
              otherFees: 0,
              salesTax: 0,
              summary: null,
            });
            return;
          }

          const sample = data[0] || {};
          const hasItemName = 'Item Name' in sample || 'item_name' in sample;
          const hasStatement = 'Fees & Taxes' in sample || 'Net' in sample;

          if (hasItemName) {
            const items: ItemRow[] = data.map((row) => ({
              orderId: getValue(row, ['order_id', 'Order ID']),
              date: getValue(row, ['date', 'Sale Date']),
              itemName: getValue(row, ['item_name', 'Item Name']) || 'Без назви',
              quantity: toQuantity(getValue(row, ['quantity', 'Quantity'])),
              price: toNumber(getValue(row, ['price', 'Price', 'Item Total'])),
              shipping: toNumber(getValue(row, ['shipping', 'Order Shipping'])),
              discount: toNumber(getValue(row, ['Discount Amount', 'discount_amount'])),
              shippingDiscount: toNumber(getValue(row, ['Shipping Discount', 'shipping_discount'])),
            }));
            resolve({
              items,
              orders: [],
              statements: [],
              adsFees: 0,
              otherFees: 0,
              salesTax: 0,
              summary: null,
            });
          } else if (hasStatement) {
            const statements: StatementFee[] = [];
            let adsFees = 0;
            let otherFees = 0;
            let salesTax = 0;
            let salesTotal = 0;
            let feesTotal = 0;
            let marketingTotal = 0;
            let otherTotal = 0;
            let refundTotal = 0;

            data.forEach((row) => {
              const info = `${getValue(row, ['Info'])} ${getValue(row, ['Title'])}`;
              const type = getValue(row, ['Type']).toLowerCase();
              const title = getValue(row, ['Title']).toLowerCase();
              const match = info.match(/(\d{6,})/);
              const orderId = match ? match[1] : '';
              const rawFees = toNumber(getValue(row, ['Fees & Taxes']));
              const rawAmount = toNumber(getValue(row, ['Amount']));
              const feeSigned = rawFees !== 0 ? rawFees : rawAmount;
              const feeAbs = Math.abs(feeSigned);
              const feeCost = -feeSigned;
              const amountValue = rawAmount;

              if (feeAbs === 0) return;

              const isMarketingCharge = type === 'marketing';
              if (isMarketingCharge) {
                adsFees += feeCost;
                marketingTotal += feeCost;
                return;
              }

              const isSalesTax = type === 'tax' && title.includes('sales tax paid by buyer');
              if (isSalesTax) {
                salesTax += feeAbs;
                salesTotal += feeSigned;
              }

              if (type === 'sale' || type === 'refund') {
                if (amountValue !== 0) {
                  salesTotal += amountValue;
                }
                if (type === 'refund' && amountValue < 0) {
                  refundTotal += Math.abs(amountValue);
                }
              }

              const isVatRelated = title.includes('vat') && !isSalesTax;
              const isFeeType =
                type === 'fee' ||
                type === 'vat' ||
                isVatRelated ||
                title.includes('transaction fee') ||
                title.includes('processing fee') ||
                title.includes('listing');
              const isOtherCost =
                type.includes('shipping') ||
                title.includes('shipping label') ||
                type.includes('adjustment') ||
                title.includes('adjustment') ||
                type.includes('other');

              if (orderId) {
                if (isFeeType) {
                  statements.push({ orderId, fee: feeCost, isAd: false, isSalesTax: false });
                  feesTotal += feeCost;
                } else if (isSalesTax) {
                  statements.push({ orderId, fee: feeAbs, isAd: false, isSalesTax: true });
                } else if (isOtherCost) {
                  otherTotal += feeCost;
                }
              } else {
                if (isFeeType) {
                  feesTotal += feeCost;
                  otherFees += feeCost;
                } else if (isOtherCost) {
                  otherTotal += feeCost;
                }
              }
            });

            resolve({
              items: [],
              orders: [],
              statements,
              adsFees,
              otherFees,
              salesTax,
              summary: {
                salesTotal,
                feesTotal,
                marketingTotal,
                otherTotal,
                refundTotal,
                netProfit: salesTotal - feesTotal - marketingTotal - otherTotal,
              },
            });
          } else {
            const orders: OrderRow[] = data.map((row) => ({
              orderId: getValue(row, ['order_id', 'Order ID']),
              date: getValue(row, ['date', 'Sale Date']),
              orderValue: toNumber(getValue(row, ['Order Value', 'Order Value '])),
              orderTotal: toNumber(getValue(row, ['Order Total', 'Adjusted Order Total'])),
              orderNet: toNumber(getValue(row, ['Order Net', 'Adjusted Net Order Amount'])),
              shipping: toNumber(getValue(row, ['Shipping', 'Order Shipping'])),
              discount: toNumber(getValue(row, ['Discount Amount', 'discount_amount'])),
              shippingDiscount: toNumber(getValue(row, ['Shipping Discount', 'shipping_discount'])),
              transactionFee: toNumber(getValue(row, ['transaction_fee', 'Transaction Fee'])),
              processingFee: toNumber(getValue(row, ['Card Processing Fees', 'processing_fee'])),
            }));
            resolve({
              items: [],
              orders,
              statements: [],
              adsFees: 0,
              otherFees: 0,
              salesTax: 0,
              summary: null,
            });
          }
        },
        error: () =>
          resolve({
            items: [],
            orders: [],
            statements: [],
            adsFees: 0,
            otherFees: 0,
            salesTax: 0,
            summary: null,
          }),
      });
    });

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    setError('');
    setIsParsing(true);
    const list = Array.from(files);
    setFileNames(list.map((file) => file.name));

    const parsed = await Promise.all(list.map(parseFile));
    const items = parsed.flatMap((p) => p.items);
    const orders = parsed.flatMap((p) => p.orders);
    const statements = parsed.flatMap((p) => p.statements);
    const adsFees = parsed.reduce((sum, p) => sum + (p.adsFees || 0), 0);
    const otherFees = parsed.reduce((sum, p) => sum + (p.otherFees || 0), 0);
    const salesTax = parsed.reduce((sum, p) => sum + (p.salesTax || 0), 0);
    const summary = parsed.find((p) => p.summary)?.summary ?? null;

    if (!items.length && !orders.length && !statements.length && !adsFees && !otherFees) {
      setError('Не вдалося прочитати CSV. Переконайтесь, що файл має потрібні поля.');
      setRows([]);
      setIsParsing(false);
      return;
    }

    const ordersMap = new Map<string, OrderRow>();
    orders.forEach((order) => {
      if (order.orderId) {
        ordersMap.set(order.orderId, order);
      }
    });

    const statementFeeMap = new Map<string, number>();
    const salesTaxMap = new Map<string, number>();
    statements.forEach((statement) => {
      if (statement.isSalesTax) {
        salesTaxMap.set(
          statement.orderId,
          (salesTaxMap.get(statement.orderId) || 0) + statement.fee
        );
      } else {
        statementFeeMap.set(
          statement.orderId,
          (statementFeeMap.get(statement.orderId) || 0) + statement.fee
        );
      }
    });

    const mergedRows: ParsedRow[] = [];

    if (items.length) {
      items.forEach((item) => {
        const order = ordersMap.get(item.orderId);
        const statementFee = statementFeeMap.get(item.orderId) || 0;
        const itemSalesTax = salesTaxMap.get(item.orderId) || 0;
        mergedRows.push({
          orderId: item.orderId,
          date: item.date || order?.date || '',
          itemName: item.itemName || (item.orderId ? `Замовлення #${item.orderId}` : 'Без назви'),
          quantity: item.quantity,
          orderTotal: order?.orderTotal || 0,
          price: item.price || order?.orderValue || order?.orderTotal || 0,
          shipping: item.shipping || order?.shipping || 0,
          discount: item.discount || order?.discount || 0,
          shippingDiscount: item.shippingDiscount || order?.shippingDiscount || 0,
          feeStatement: statementFee,
          salesTax: itemSalesTax,
        });
      });
    } else {
      orders.forEach((order) => {
        const statementFee = statementFeeMap.get(order.orderId) || 0;
        const itemSalesTax = salesTaxMap.get(order.orderId) || 0;
        mergedRows.push({
          orderId: order.orderId,
          date: order.date,
          itemName: order.orderId ? `Замовлення #${order.orderId}` : 'Без назви',
          quantity: 1,
          orderTotal: order.orderTotal || 0,
          price: order.orderValue || order.orderTotal,
          shipping: order.shipping,
          discount: order.discount,
          shippingDiscount: order.shippingDiscount,
          feeStatement: statementFee,
          salesTax: itemSalesTax,
        });
      });
    }

    setRows(mergedRows);
    setAdsFeesTotal(summary?.marketingTotal ?? adsFees);
    setOtherFeesTotal(summary?.otherTotal ?? otherFees);
    setRefundsTotal(summary?.refundTotal ?? 0);
    setStatementSummary(summary);
    setIsParsing(false);
  }, []);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const metrics = useMemo(() => {
    if (statementSummary) {
      return {
        revenue: statementSummary.salesTotal,
        fees: statementSummary.feesTotal,
        profit: statementSummary.netProfit,
        orders: new Set(rows.map((row) => row.orderId || `${row.date}-${row.itemName}`)).size,
      };
    }

    const revenue = rows.reduce((sum, row) => {
      if (row.orderTotal > 0) {
        return sum + row.orderTotal - row.salesTax;
      }
      return sum + row.price + row.shipping - row.discount - row.shippingDiscount;
    }, 0);
    const feesFromRows = rows.reduce((sum, row) => sum + row.feeStatement, 0);
    const fees = feesFromRows + otherFeesTotal;
    const profit = revenue - fees;
    const orderIds = new Set(rows.map((row) => row.orderId || `${row.date}-${row.itemName}`));

    return {
      revenue,
      fees,
      profit,
      orders: orderIds.size,
    };
  }, [rows, otherFeesTotal, statementSummary]);

  const monthlyData = useMemo(() => {
    const map = new Map<string, number>();

    rows.forEach((row) => {
      const parsedDate = new Date(row.date);
      const key = Number.isNaN(parsedDate.getTime())
        ? row.date || 'Невідомо'
        : `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}`;
      const rowRevenue =
        row.orderTotal > 0
          ? row.orderTotal - row.salesTax
          : row.price + row.shipping - row.discount - row.shippingDiscount;
      map.set(key, (map.get(key) || 0) + rowRevenue);
    });

    const labels = Array.from(map.keys()).sort();
    const data = labels.map((label) => map.get(label) || 0);

    return { labels, data };
  }, [rows]);

  const productData = useMemo(() => {
    const map = new Map<string, number>();

    rows.forEach((row) => {
      map.set(row.itemName, (map.get(row.itemName) || 0) + row.quantity);
    });

    const sorted = Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      labels: sorted.map(([name]) => name),
      data: sorted.map(([, value]) => value),
    };
  }, [rows]);

  const tableRows = useMemo(
    () =>
      rows.map((row) => {
        const revenue =
          row.orderTotal > 0
            ? row.orderTotal - row.salesTax
            : row.price + row.shipping - row.discount - row.shippingDiscount;
        const fees = row.feeStatement;
        return {
          ...row,
          revenue,
          fees,
          profit: revenue - fees,
        };
      }),
    [rows]
  );

  const exportSummary = () => {
    const csv = [
      ['Дохід', 'Комісії', 'Прибуток', 'Кількість замовлень'].join(','),
      [
        metrics.revenue.toFixed(2),
        metrics.fees.toFixed(2),
        metrics.profit.toFixed(2),
        metrics.orders.toString(),
      ].join(','),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'etsy-finance-summary.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Які файли потрібні</h2>
        <p className="mt-2 text-sm text-slate-600">
          Завантажте CSV зі звітів Etsy, щоб отримати повну аналітику.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">1. Etsy statement CSV</p>
            <p className="mt-2 text-xs text-slate-600">
              Shop Manager → Finances → Payment account → Download CSV.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">2. EtsySoldOrders CSV</p>
            <p className="mt-2 text-xs text-slate-600">
              Shop Manager → Settings → Options → Download data.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">3. EtsySoldOrderItems CSV</p>
            <p className="mt-2 text-xs text-slate-600">
              Shop Manager → Settings → Options → Download data.
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Рекомендуємо завантажувати всі три файли для точних підсумків.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition hover:border-brand-orange"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <p className="text-base font-semibold text-slate-700">
            Завантажте CSV файл з Etsy
          </p>
          <p className="text-sm text-slate-500">
            Підтримуються файли Etsy statement, EtsySoldOrders та EtsySoldOrderItems.
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-500/30 transition hover:bg-orange-700"
          >
            Завантажити файл
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            multiple
            className="hidden"
            onChange={onFileChange}
          />
          {fileNames.length ? (
            <p className="text-xs text-slate-500">Файли: {fileNames.join(', ')}</p>
          ) : null}
          {isParsing ? <p className="text-xs text-slate-500">Обробка файлу...</p> : null}
          {error ? <p className="text-xs text-red-500">{error}</p> : null}
        </div>
      </section>

      {rows.length > 0 ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Загальний дохід', value: metrics.revenue, isMoney: true },
              { label: 'Кількість замовлень', value: metrics.orders, isMoney: false },
              { label: 'Комісії Etsy', value: metrics.fees, isMoney: true },
              { label: 'Орієнтовний прибуток', value: metrics.profit, isMoney: true },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-500">{card.label}</p>
                <p className="mt-3 text-2xl font-bold text-slate-900">
                  {typeof card.value === 'number'
                    ? card.isMoney
                      ? `$${card.value.toFixed(2)}`
                      : card.value.toString()
                    : card.value}
                </p>
              </div>
            ))}
          </section>

          {adsFeesTotal > 0 ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Витрати на рекламу</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Суми з statement для Etsy Ads (не враховуються у комісіях).
                  </p>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  ${adsFeesTotal.toFixed(2)}
                </div>
              </div>
            </section>
          ) : null}

          {refundsTotal > 0 ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Повернення</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Сума повернень покупцям зі statement.
                  </p>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  ${refundsTotal.toFixed(2)}
                </div>
              </div>
            </section>
          ) : null}

          {otherFeesTotal > 0 ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Інші витрати</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Shipping labels, adjustments та інші витрати зі statement.
                  </p>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  ${otherFeesTotal.toFixed(2)}
                </div>
              </div>
            </section>
          ) : null}

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Дохід по місяцях</h2>
              <div className="mt-4 h-72">
                <Line
                  data={{
                    labels: monthlyData.labels,
                    datasets: [
                      {
                        label: 'Дохід',
                        data: monthlyData.data,
                        borderColor: '#EF4406',
                        backgroundColor: 'rgba(239,68,6,0.15)',
                        tension: 0.3,
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: {
                        ticks: {
                          callback: (value) => `$${value}`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Найпопулярніші товари</h2>
              <div className="mt-4 h-72">
                <Bar
                  data={{
                    labels: productData.labels,
                    datasets: [
                      {
                        label: 'Кількість',
                        data: productData.data,
                        backgroundColor: 'rgba(15,23,42,0.75)',
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    indexAxis: 'y',
                    scales: {
                      x: {
                        ticks: {
                          precision: 0,
                        },
                      },
                      y: {
                        ticks: {
                          callback: (value, index) => {
                            const label = productData.labels[index] || '';
                            return label.length > 24 ? `${label.slice(0, 24)}…` : label;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Показано топ‑5 товарів за кількістю продажів.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900">Транзакції</h2>
              <button
                type="button"
                onClick={exportSummary}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-orange hover:text-brand-orange"
              >
                Експорт звіту
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-3 py-3">Дата</th>
                    <th className="px-3 py-3">Товар</th>
                    <th className="px-3 py-3">Ціна</th>
                    <th className="px-3 py-3">Комісії</th>
                    <th className="px-3 py-3">Прибуток</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, index) => (
                    <tr key={`${row.orderId}-${index}`} className="border-b border-slate-100">
                      <td className="px-3 py-3">{row.date || '—'}</td>
                      <td className="px-3 py-3">{row.itemName}</td>
                      <td className="px-3 py-3">${row.revenue.toFixed(2)}</td>
                      <td className="px-3 py-3">${row.fees.toFixed(2)}</td>
                      <td className="px-3 py-3">${row.profit.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default EtsyFinanceDashboard;
