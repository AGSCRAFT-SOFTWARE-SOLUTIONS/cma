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
    phone: string;
    address: string;
};

export type Project = {
    id: string;
    name: string;
    location: string;
    category: string;
    client_id: string;
    budget: number;
    start_date: string;
    completion_date: string;
    description: string;
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

export type SubContract = {
    id: string;
    contractor_id: string;
    project_id: string;
    work: string;
    start_date: string;
    completion_date: string;
};

export type Transaction = {
    id: string;
    account_id: string;
    amount: number;
    pre_balance: number;
    post_balance: number;
    payment_method: string;
    note: string;
    created_at: string;
    updated_at: string;
};

export type TransactionAugment = Transaction & { account: Account };

export type Expense = {
    id: string;
    transaction_id: string;
    project_id: string;
    sub_contract_id: string | null;
};

export type Product = {
    id: string;
    name: string;
    cost: number;
    type: "business" | "others";
    expense_id: string;
};

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
