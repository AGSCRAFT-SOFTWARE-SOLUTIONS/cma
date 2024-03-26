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
    accounts: Account[];
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
    hsn_sac: string;
    unit: number;
    uom: string;
    unit_price: number;
    c_gst: number;
    s_gst: number;
    total: number;
    type: "business" | "others";
    purchase_id: string;
};

export type Purchase = {
    id: string;
    products: Product[];
    expense_id: string;
};

export type PurchaseAugment = Purchase & { expense: ExpenseAugment };

export type SubContract = {
    id: string;
    project_id: string;
    work: string;
    contractor_id: string;
    start_date: string;
    completion_date: string;
};

export type SubContractAugment = SubContract & {
    contractor: Contractor;
    expense: ExpenseAugment[];
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

export type ExpenseAugment = Expense & { transaction: TransactionAugment };

export type ProjectAugment = Project & {
    client: Client & {
        client_payments: ClientPaymentAugment[];
    };
    sub_contracts?: SubContractAugment[];
    purchases?: PurchaseAugment[];
};
