import { Link } from "@inertiajs/react"
import { PropsWithChildren, useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { HiBanknotes } from "react-icons/hi2"
import { MdAdd, MdWork } from "react-icons/md"
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar"

export default ({ children }: PropsWithChildren) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)

    return <section className="flex">
        <Sidebar collapsed={!isSideBarOpen} className="h-screen">
            <Menu><MenuItem icon={<GiHamburgerMenu />} onClick={() => setIsSideBarOpen(prev => !prev)}>AGKScraft</MenuItem></Menu>
            <Menu closeOnClick>
                <SubMenu label="Accouts" icon={<HiBanknotes />} onOpenChange={() => setIsSideBarOpen(true)}>
                    <MenuItem component={<Link href="#" />} icon={<MdAdd />}> Add account </MenuItem>
                </SubMenu>
                <SubMenu label="Projects" icon={<MdWork />} onOpenChange={() => setIsSideBarOpen(true)}>
                    <MenuItem component={<Link href="#" />} icon={<MdAdd />}> Add project </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
        <main className="p-4">{children}</main>
    </section>
}
