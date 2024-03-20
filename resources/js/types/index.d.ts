export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    clients: Client[];
    projects: Project[];
    accoutns: Account[];
};

export type Account = {
    id: string;
    name: string;
    balance: number;
    type: "bank" | "advance";
};

export type Client = {
    id: string;
    name: string;
    address: string;
    phone: string;
};

export type ClientPayment = {
    id: string;
    client_id: string;
    project_id: string;
    transaction_id: string;
};

export type ClientPaymentAugment = ClientPayment & {
    transaction: TransactionAugment;
};

export type Contractor = {
    id: string;
    name: string;
    phone: string;
};

export type Expense = {
    id: string;
    project_id: string;
    sub_contract_id: string | null;
    transaction_id: string;
};

export type Project = {
    id: string;
    name: string;
    client_id: string;
    category: string;
    location: string;
    budget: number;
    start_date: string;
    completion_date: string;
    description: string;
};

export type Product = {
    id: string;
    name: string;
    cost: number;
    type: "business" | "others";
    expense_id: string;
};

export type Purchase = {
    id: string;
    products: Product[];
    expense_id: string;
};

export type SubContract = {
    id: string;
    project_id: string;
    work: string;
    contractor_id: string;
    start_date: string;
    completion_date: string;
};

export type Transaction = {
    id: string;
    account_id: string;
    amount: number;
    created_at: string;
    payment_method: string;
    post_balance: number;
    pre_balance: number;
    note: string;
};

export type TransactionAugment = Transaction & { account: Account };

export type ExpenseAugment = Expense & { transaction: TransactionAugment } & {
    products: Product[] | null;
    sub_contracts: SubContract | null;
};

export type ProjectAugment = Project & {
    client: Client & {
        client_payments: ClientPaymentAugment[];
    };
    sub_contracts: (SubContract & {
        contractor: Contractor;
    })[];
    expenses: ExpenseAugment[];
};
