import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import CreateUpdateAccount from "./Pages/Accounts/CreateUpdateAccount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBank,
    faBars,
    faBriefcase,
    faBuilding,
    faCirclePlus,
    faUser,
    faUserGroup,
    faWallet,
} from "@fortawesome/free-solid-svg-icons";
import CreateUpdateProject from "./Pages/Projects/CreateUpdateProject";
import CreateUpdateClient from "./Pages/Clients/CreateUpdateClient";

export default ({ children }: PropsWithChildren) => {
    const props = usePage().props as any;
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    return (
        <section className="flex">
            {props.auth.user && (
                <Sidebar collapsed={!isSideBarOpen} className="h-screen">
                    <Menu>
                        <MenuItem
                            icon={<FontAwesomeIcon icon={faBars} />}
                            onClick={() => setIsSideBarOpen((prev) => !prev)}
                        >
                            AGKScraft
                        </MenuItem>
                    </Menu>
                    <Menu closeOnClick>
                        <SubMenu
                            label="Accouts"
                            icon={<FontAwesomeIcon icon={faBank} />}
                            onOpenChange={() => setIsSideBarOpen(true)}
                        >
                            <CreateUpdateAccount type="create">
                                <MenuItem
                                    icon={
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                    }
                                >
                                    Add account
                                </MenuItem>
                            </CreateUpdateAccount>
                            <MenuItem
                                icon={<FontAwesomeIcon icon={faWallet} />}
                                component={
                                    <Link href={route("accounts.index")} />
                                }
                            >
                                Show all clients
                            </MenuItem>
                        </SubMenu>
                        <SubMenu
                            label="Projects"
                            icon={<FontAwesomeIcon icon={faBriefcase} />}
                            onOpenChange={() => setIsSideBarOpen(true)}
                        >
                            <CreateUpdateProject
                                type="create"
                                clients={props.clients}
                            >
                                <MenuItem
                                    component={<Link href="#" />}
                                    icon={
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                    }
                                >
                                    Add project
                                </MenuItem>
                            </CreateUpdateProject>
                            <MenuItem
                                icon={<FontAwesomeIcon icon={faBuilding} />}
                                component={
                                    <Link href={route("projects.index")} />
                                }
                            >
                                Show all projects
                            </MenuItem>
                        </SubMenu>
                        <SubMenu
                            label="Clients"
                            icon={<FontAwesomeIcon icon={faUser} />}
                            onOpenChange={() => setIsSideBarOpen(true)}
                        >
                            <CreateUpdateClient type="create">
                                <MenuItem
                                    component={<Link href="#" />}
                                    icon={
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                    }
                                >
                                    Add Client
                                </MenuItem>
                            </CreateUpdateClient>
                            <MenuItem
                                icon={<FontAwesomeIcon icon={faUserGroup} />}
                                component={
                                    <Link href={route("clients.index")} />
                                }
                            >
                                Show all accounts
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </Sidebar>
            )}
            <main
                className={
                    props.auth.user
                        ? "p-4 flex-grow"
                        : "h-screen grid place-content-center w-full"
                }
            >
                {children}
            </main>
        </section>
    );
};
