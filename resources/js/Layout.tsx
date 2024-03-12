import { Link, usePage } from "@inertiajs/react"
import { PropsWithChildren, useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { HiBanknotes } from "react-icons/hi2"
import { MdAdd, MdWork } from "react-icons/md"
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar"
import CreateOrUpdateAccount from "./Pages/Accounts/CreateOrUpdateAccount"
import { User } from "./types"

export default ({ children }: PropsWithChildren) => {
    const auth = usePage().props.auth as { user: User | null };
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)


    return <section className="flex">
        {auth.user && <Sidebar collapsed={!isSideBarOpen} className="h-screen">
            <Menu><MenuItem icon={<GiHamburgerMenu />} onClick={() => setIsSideBarOpen(prev => !prev)}>AGKScraft</MenuItem></Menu>
            <Menu closeOnClick>
                <SubMenu label="Accouts" icon={<HiBanknotes />} onOpenChange={() => setIsSideBarOpen(true)}>
                    <CreateOrUpdateAccount type="create">
                        <MenuItem icon={<MdAdd />}> Add account </MenuItem>
                    </CreateOrUpdateAccount>
                </SubMenu>
                <SubMenu label="Projects" icon={<MdWork />} onOpenChange={() => setIsSideBarOpen(true)}>
                    <MenuItem component={<Link href="#" />} icon={<MdAdd />}> Add project </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>}
        <main className={auth.user ? "p-4" : "h-screen grid place-content-center w-full"}>{children}</main>
    </section>
}
