import { ProjectAugment } from "@/types";
import {
    faArrowTrendDown,
    faInfo,
    faMoneyBillTransfer,
    faNoteSticky,
    faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "@inertiajs/react";
import { Avatar, Tab, Tabs } from "@nextui-org/react";
import ProjectInfo from "./ProjectInfo";
import ProjectOverview from "./ProjectOverview";
import ProjectTransactions from "./ProjectTransactions";
import ProjectDayLogs from "./ProjectDayLogs";

export default ({ project }: { project: ProjectAugment }) => {
    console.log(project);
    return (
        <section className="grid gap-4">
            <Head title={project.name} />
            <div className="flex gap-8 items-center">
                <Avatar
                    name={project.name[0].toUpperCase()}
                    size="lg"
                    className="text-8xl w-32 h-32"
                />
                <div>
                    <h3 className="text-4xl font-bold">{project.name}</h3>
                    <p className="text-default-500">
                        Client: {project.client.name}
                    </p>
                </div>
            </div>
            <Tabs
                color="primary"
                variant="solid"
                defaultSelectedKey={"day_logs"}
            >
                <Tab
                    key="overview"
                    title={
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faPaperclip} />
                            <span>Overview</span>
                        </div>
                    }
                >
                    <ProjectOverview project={project} />
                </Tab>
                <Tab
                    key="info"
                    title={
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faInfo} />
                            <span>Info</span>
                        </div>
                    }
                >
                    <ProjectInfo project={project} />
                </Tab>
                <Tab
                    key="transactions"
                    title={
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faMoneyBillTransfer} />
                            <span>Transactions</span>
                        </div>
                    }
                >
                    <ProjectTransactions project={project} />
                </Tab>
                <Tab
                    key="day_logs"
                    title={
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faNoteSticky} />
                            <span>Day log</span>
                        </div>
                    }
                >
                    <ProjectDayLogs project={project} />
                </Tab>
            </Tabs>
        </section>
    );
};
