import { ProjectAugment } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";

export default ({ project }: { project: ProjectAugment }) => {
    return (
        <div className="grid gap-8">
            <div className="grid gap-2">
                <h3 className="font-bold text-2xl">Client Payments</h3>
                <Table>
                    <TableHeader>
                        <TableColumn>Sno</TableColumn>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Amount</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {project.client.client_payments.map(
                            (payment, index) => (
                                <TableRow>
                                    <TableCell>{index}</TableCell>
                                    <TableCell>{project.client.name}</TableCell>
                                    <TableCell>
                                        {payment.transaction.created_at}
                                    </TableCell>
                                    <TableCell>
                                        {payment.transaction.amount}
                                    </TableCell>
                                </TableRow>
                            ),
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="grid gap-2">
                <h3 className="font-bold text-2xl">Expenses</h3>
                <Table>
                    <TableHeader>
                        <TableColumn>Sno</TableColumn>
                        <TableColumn>Type</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Amount</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {project.expenses.map((expense, index) => (
                            <TableRow>
                                <TableCell>{index}</TableCell>
                                <TableCell>
                                    {expense.sub_contract_id
                                        ? "Sub contract"
                                        : expense.products?.[0].type}
                                </TableCell>
                                <TableCell>
                                    {expense.transaction.created_at}
                                </TableCell>
                                <TableCell>
                                    {expense.transaction.amount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
