export class FinancialStatementDTO {
    _id: number
    _user_id: number
    date: number
    action: number
    amount: number
    balance: number
    note: string
    financial_statement_group: number
    created_by: number
    created_at: Date
}