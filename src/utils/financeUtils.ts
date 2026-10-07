import { ProjectItem, ProjectFinancialItem } from '../types/backend';

export interface CalculatedProjectFinance {
  contractValue: number;
  // Inflow
  downPaymentAmount: number;
  downPaymentPercent: number;
  downPaymentStatus: 'Received' | 'Pending' | 'Overdue';
  downPaymentDate?: string;
  finalPaymentAmount: number;
  finalPaymentPercent: number;
  finalPaymentStatus: 'Received' | 'Pending' | 'Not Invoiced';
  finalPaymentDate?: string;
  totalCashInflowReceived: number;
  totalReceivablesOutstanding: number;

  // Outflow (HPP & Biaya)
  materialCost: number;
  machiningCost: number;
  subconCost: number;
  assemblyLaborCost: number;
  logisticsCost: number;
  otherCost: number;
  totalCostOutflow: number;

  // Taxes
  taxPpnPercent: number;
  taxPpnAmount: number;
  taxPph23Percent: number;
  taxPph23Amount: number;
  fakturPajakNumber: string;

  // Net P&L (Rugi Laba)
  netProfit: number;
  netProfitMargin: number; // percentage e.g. 28.5%
  profitStatus: 'Sangat Sehat' | 'Sehat' | 'Waspada' | 'Defisit';

  // Meta
  bankAccount: string;
  notes?: string;
}

export const getProjectFinancialDetails = (project: ProjectItem): CalculatedProjectFinance => {
  const fin = project.financial;
  const val = project.contractValue || 0;

  // Inflow defaults based on project status
  const dpPct = fin?.downPaymentPercent ?? 50;
  const dpAmt = fin?.downPaymentAmount ?? Math.round((val * dpPct) / 100);
  const dpStatus =
    fin?.downPaymentStatus ??
    (project.status === 'Completed' || project.progressPercent > 20 ? 'Received' : 'Pending');
  const dpDate = fin?.downPaymentDate || project.startDate;

  const fpPct = fin?.finalPaymentPercent ?? 50;
  const fpAmt = fin?.finalPaymentAmount ?? Math.round((val * fpPct) / 100);
  const fpStatus =
    fin?.finalPaymentStatus ??
    (project.status === 'Completed' ? 'Received' : 'Pending');
  const fpDate = fin?.finalPaymentDate || project.actualCompletionDate || project.targetCompletionDate;

  const totalCashInflowReceived =
    (dpStatus === 'Received' ? dpAmt : 0) + (fpStatus === 'Received' ? fpAmt : 0);
  const totalReceivablesOutstanding =
    (dpStatus !== 'Received' ? dpAmt : 0) + (fpStatus !== 'Received' ? fpAmt : 0);

  // Outflow defaults (Standard industrial machine manufacturing cost breakdown)
  const materialCost = fin?.materialCost ?? Math.round(val * 0.34);
  const machiningCost = fin?.machiningCost ?? Math.round(val * 0.18);
  const subconCost = fin?.subconCost ?? Math.round(val * 0.06);
  const assemblyLaborCost = fin?.assemblyLaborCost ?? Math.round(val * 0.10);
  const logisticsCost = fin?.logisticsCost ?? Math.round(val * 0.02);
  const otherCost = fin?.otherCost ?? Math.round(val * 0.01);

  const totalCostOutflow =
    materialCost + machiningCost + subconCost + assemblyLaborCost + logisticsCost + otherCost;

  // Taxes
  const taxPpnPercent = fin?.taxPpnPercent ?? 11;
  const taxPpnAmount = fin?.taxPpnAmount ?? Math.round((val * taxPpnPercent) / 100);
  const taxPph23Percent = fin?.taxPph23Percent ?? 2;
  const taxPph23Amount = fin?.taxPph23Amount ?? Math.round((val * taxPph23Percent) / 100);

  const cleanDigits = (project.poNumber || '').replace(/\D/g, '') || '20260901';
  const fakturPajakNumber =
    fin?.fakturPajakNumber || `010.002-26.${cleanDigits.slice(-8).padStart(8, '0')}`;

  // Net Profit & Loss Calculation:
  // Gross Revenue (contractValue) - Total HPP (Cost of Goods) - PPh 23 (Tax Expense)
  const netProfit = val - totalCostOutflow - taxPph23Amount;
  const netProfitMargin = val > 0 ? Number(((netProfit / val) * 100).toFixed(1)) : 0;

  let profitStatus: 'Sangat Sehat' | 'Sehat' | 'Waspada' | 'Defisit' = 'Sehat';
  if (netProfitMargin >= 25) profitStatus = 'Sangat Sehat';
  else if (netProfitMargin >= 15) profitStatus = 'Sehat';
  else if (netProfitMargin > 0) profitStatus = 'Waspada';
  else profitStatus = 'Defisit';

  return {
    contractValue: val,
    downPaymentAmount: dpAmt,
    downPaymentPercent: dpPct,
    downPaymentStatus: dpStatus,
    downPaymentDate: dpDate,
    finalPaymentAmount: fpAmt,
    finalPaymentPercent: fpPct,
    finalPaymentStatus: fpStatus,
    finalPaymentDate: fpDate,
    totalCashInflowReceived,
    totalReceivablesOutstanding,
    materialCost,
    machiningCost,
    subconCost,
    assemblyLaborCost,
    logisticsCost,
    otherCost,
    totalCostOutflow,
    taxPpnPercent,
    taxPpnAmount,
    taxPph23Percent,
    taxPph23Amount,
    fakturPajakNumber,
    netProfit,
    netProfitMargin,
    profitStatus,
    bankAccount: fin?.bankAccountDestination || 'BCA 731-0988-123 a/n PT. Prima Teknik Trada',
    notes: fin?.financeNotes,
  };
};

export interface AggregateFinancialSummary {
  totalContractValue: number;
  totalCashInflow: number;
  totalReceivables: number;
  totalHppCost: number;
  totalMaterialCost: number;
  totalMachiningCost: number;
  totalSubconCost: number;
  totalAssemblyCost: number;
  totalLogisticsCost: number;
  totalTaxPpn: number;
  totalTaxPph23: number;
  totalNetProfit: number;
  avgNetProfitMargin: number;
}

export const calculateAggregateFinancials = (projects: ProjectItem[]): AggregateFinancialSummary => {
  const details = projects.map(getProjectFinancialDetails);

  const totalContractValue = details.reduce((acc, d) => acc + d.contractValue, 0);
  const totalCashInflow = details.reduce((acc, d) => acc + d.totalCashInflowReceived, 0);
  const totalReceivables = details.reduce((acc, d) => acc + d.totalReceivablesOutstanding, 0);
  const totalHppCost = details.reduce((acc, d) => acc + d.totalCostOutflow, 0);
  const totalMaterialCost = details.reduce((acc, d) => acc + d.materialCost, 0);
  const totalMachiningCost = details.reduce((acc, d) => acc + d.machiningCost, 0);
  const totalSubconCost = details.reduce((acc, d) => acc + d.subconCost, 0);
  const totalAssemblyCost = details.reduce((acc, d) => acc + d.assemblyLaborCost, 0);
  const totalLogisticsCost = details.reduce((acc, d) => acc + d.logisticsCost, 0);
  const totalTaxPpn = details.reduce((acc, d) => acc + d.taxPpnAmount, 0);
  const totalTaxPph23 = details.reduce((acc, d) => acc + d.taxPph23Amount, 0);
  const totalNetProfit = details.reduce((acc, d) => acc + d.netProfit, 0);
  const avgNetProfitMargin =
    totalContractValue > 0 ? Number(((totalNetProfit / totalContractValue) * 100).toFixed(1)) : 0;

  return {
    totalContractValue,
    totalCashInflow,
    totalReceivables,
    totalHppCost,
    totalMaterialCost,
    totalMachiningCost,
    totalSubconCost,
    totalAssemblyCost,
    totalLogisticsCost,
    totalTaxPpn,
    totalTaxPph23,
    totalNetProfit,
    avgNetProfitMargin,
  };
};
