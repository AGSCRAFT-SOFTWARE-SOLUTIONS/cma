import { Account, PageProps } from "@/types"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import CreateUpdateAccount from "./CreateUpdateAccount"
import DeleteAccount from "./DeleteAccount"
import ReadAccount from "./ReadAccount"
import { Head } from "@inertiajs/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"

export default ({ accounts }: PageProps<{ accounts: Account[] }>) => {
    return <section className="grid gap-4">
        <Head title="Accouts" />
        <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Accouts</h1>
            <CreateUpdateAccount type="create">
                <Button color="primary" variant="shadow" ><FontAwesomeIcon icon={faCirclePlus} /> Add one</Button>
            </CreateUpdateAccount>
        </div>
        <Table>
            <TableHeader>
                <TableColumn>SNo</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Balance</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    accounts.map((account, index) =>
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{account.name}</TableCell>
                            <TableCell>{account.balance}</TableCell>
                            <TableCell>{account.type}</TableCell>
                            <TableCell className="flex gap-2">
                                <ReadAccount account={account}>
                                    <Button className="min-w-min" color="primary" variant="flat"><FontAwesomeIcon icon={faEye} /></Button>
                                </ReadAccount>
                                <CreateUpdateAccount type="edit" account={account}>
                                    <Button className="min-w-min" color="secondary" variant="flat"><FontAwesomeIcon icon={faPen} /></Button>
                                </CreateUpdateAccount>
                                <DeleteAccount account={account}>
                                    <Button className="min-w-min" color="danger" variant="flat"><FontAwesomeIcon icon={faTrash} /></Button>
                                </DeleteAccount>
                            </TableCell>
                        </TableRow>
                    )}
            </TableBody>
        </Table>
    </section>
}
