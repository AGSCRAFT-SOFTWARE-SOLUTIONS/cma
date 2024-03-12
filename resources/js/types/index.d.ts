export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type Account = {
    name: string,
    balance: number,
    type: "bank" | "advance"
}

export type Transaction = {
    account_id: string,
    amount: number,
    pre_balance: number,
    post_balance: number,
    payment_method: string,
    note: string,
}

export type Client = {
    name: string,
    phone: string,
    address: string,
}

export type Project = {
    name: string,
    location: string,
    category: string,
    client_id: string,
    budget: number,
    start_date: string,
    completion_date: string,
    description: string,
}

export type ClientPayment = {
    client_id: string,
    project_id: string,
    transaction_id: string,
}

export type Contractor = {
    name: string,
    phone: string,
}

export type SubContract = {
    contractor_id: string,
    project_id: string,
    work: string,
    start_date: string,
    completion_date: string,
}

export type Expense = {
    transaction_id: string,
    project_id: string,
    sub_contract_id: string,
}

export type Product = {
    name: string,
    cost: number,
    type: "business" | "others",
    expense_id: string,
}
