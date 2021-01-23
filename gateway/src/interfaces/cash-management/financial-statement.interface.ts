export interface IFinancialStatement{
    _id: number
    _user_id: number
    date: number,
    amount: number,
    balance: number,
    action: number,
    note: string,
    financial_statement_group: string,
    created_at: Date,
    created_by: number
}