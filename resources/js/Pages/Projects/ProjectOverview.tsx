import { ExpenseAugment, ProjectAugment } from "@/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
const calculateTotal = (
    items: ExpenseAugment[],
    condition: (item: ExpenseAugment) => boolean,
) =>
    items.reduce(
        (total, item) =>
            condition(item) ? total + item.transaction.amount : total,
        0,
    );
export default ({ project }: { project: ProjectAugment }) => {
    const totalClientPayments = project.client.client_payments.reduce(
        (total, payment) => total + payment.transaction.amount,
        0,
    );
    const totalExpenses = project.expenses.reduce(
        (total, expense) => total + expense.transaction.amount,
        0,
    );
    const totalPurchasePayment = calculateTotal(
        project.expenses,
        (expense: ExpenseAugment) =>
            !expense.sub_contract_id &&
            expense.products?.[0]?.type === "business",
    );
    const totalSubcontractPayment = calculateTotal(
        project.expenses,
        (expense: ExpenseAugment) => !!expense.sub_contract_id,
    );
    const totalOtherExpensePayments = calculateTotal(
        project.expenses,
        (expense: ExpenseAugment) =>
            !expense.sub_contract_id &&
            expense.products?.[0]?.type === "others",
    );
    const actualProfit = project.budget - totalExpenses;
    const balanceToReceiveFromClient = project.budget - totalClientPayments;

    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-4">
                <Card shadow="sm">
                    <CardHeader className="text-default-500">
                        Project Budget
                    </CardHeader>
                    <CardBody className="font-bold text-3xl">
                        {project.budget}
                    </CardBody>
                </Card>
                <Card shadow="sm">
                    <CardHeader className="text-default-500">
                        Received from client
                    </CardHeader>
                    <CardBody className="font-bold text-3xl">
                        {totalClientPayments}
                    </CardBody>
                </Card>
                <Card shadow="sm">
                    <CardHeader className="text-default-500">
                        Total expense payments
                    </CardHeader>
                    <CardBody className="font-bold text-3xl">
                        {totalExpenses}
                    </CardBody>
                </Card>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <Card shadow="sm">
                    <CardHeader className="text-default-500">
                        Total purchase payment
                    </CardHeader>
                    <CardBody className="font-bold text-3xl">
                        {totalPurchasePayment}
                    </CardBody>
                </Card>
                <Card shadow="sm">
                    <CardHeader className="text-default-500">
                        Total subcontract payment
                    </CardHeader>
                    <CardBody className="font-bold text-3xl">
                        {totalSubcontractPayment}
                    </CardBody>
                </Card>
                <Card shadow="sm">
                    <CardHeader className="text-default-500">
                        Total labour wages
                    </CardHeader>
                    <CardBody className="font-bold text-3xl">0</CardBody>
                </Card>
                <Card shadow="sm">
                    <CardHeader className="text-default-500">
                        Total other expense payments
                    </CardHeader>
                    <CardBody className="font-bold text-3xl">
                        {totalOtherExpensePayments}
                    </CardBody>
                </Card>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Card
                    shadow="sm"
                    className="bg-success-500 text-success-foreground"
                >
                    <CardHeader>Actual Profit</CardHeader>
                    <CardBody className="font-bold text-3xl">
                        {actualProfit}
                    </CardBody>
                </Card>
                <Card
                    shadow="sm"
                    className="bg-danger-500 text-danger-foreground"
                >
                    <CardHeader>Balance to receive from client</CardHeader>
                    <CardBody className="font-bold text-3xl">
                        {balanceToReceiveFromClient}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
