import { ProjectAugment } from "@/types";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface Props {
    project: ProjectAugment;
}

export default ({ project }: Props) => {
    const totalClientPayments = project.client.client_payments.reduce(
        (total, payment) => total + payment.transaction.amount,
        0,
    );
    const totalPurchasePayment =
        project.purchases?.reduce(
            (total, purchase) => total + purchase.expense.transaction.amount,
            0,
        ) || 0;
    const totalSubcontractPayment =
        project.sub_contracts?.reduce((total, subcontract) => {
            return (
                total +
                subcontract.expense.reduce(
                    (total, expense) => total + expense.transaction.amount,
                    0,
                )
            );
        }, 0) || 0;
    const totalOtherExpensePayments = 0;
    const totalExpenses =
        totalPurchasePayment +
        totalSubcontractPayment +
        totalOtherExpensePayments;
    const actualProfit = totalClientPayments - totalExpenses;
    const balanceToReceiveFromClient = totalClientPayments - actualProfit;

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
                    className={
                        " text-danger-foreground " +
                        (actualProfit > 0 ? "bg-success-500" : "bg-danger-500")
                    }
                >
                    <CardHeader>Actual Profit</CardHeader>
                    <CardBody className="font-bold text-3xl">
                        {actualProfit}
                    </CardBody>
                </Card>

                <Card
                    shadow="sm"
                    className={
                        "text-danger-foreground " +
                        (balanceToReceiveFromClient > 0
                            ? "bg-danger-500"
                            : "bg-success-500")
                    }
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
