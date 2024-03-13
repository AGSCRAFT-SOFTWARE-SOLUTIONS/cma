import { Link, usePage } from "@inertiajs/react"
import { PropsWithChildren, useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar"
import CreateUpdateAccount from "./Pages/Accounts/CreateUpdateAccount"
import { User } from "./types"
import { FaBriefcase, FaCirclePlus, FaPiggyBank, FaWallet } from "react-icons/fa6"

export default ({ children }: PropsWithChildren) => {
    const auth = usePage().props.auth as { user: User | null };
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)


    return <section className="flex">
        {auth.user && <Sidebar collapsed={!isSideBarOpen} className="h-screen">
            <Menu><MenuItem icon={<GiHamburgerMenu />} onClick={() => setIsSideBarOpen(prev => !prev)}>AGKScraft</MenuItem></Menu>
            <Menu closeOnClick>
                <SubMenu label="Accouts" icon={<FaWallet />} onOpenChange={() => setIsSideBarOpen(true)}>
                    <CreateUpdateAccount type="create">
                        <MenuItem icon={<FaCirclePlus />}>Add account</MenuItem>
                    </CreateUpdateAccount>
                    <MenuItem icon={<FaPiggyBank />} component={<Link href={route("accounts.index")} />}>Show all accounts</MenuItem>
                </SubMenu>
                <SubMenu label="Projects" icon={<FaBriefcase />} onOpenChange={() => setIsSideBarOpen(true)}>
                    <MenuItem component={<Link href="#" />} icon={<FaCirclePlus />}> Add project </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>}
        <main className={auth.user ? "p-4 flex-grow" : "h-screen grid place-content-center w-full"}>{children}</main>
    </section>
}
