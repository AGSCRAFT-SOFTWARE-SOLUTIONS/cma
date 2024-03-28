import { DayLog, PageProps, Product } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure,
} from "@nextui-org/react";
import { PropsWithChildren, cloneElement, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faExclamationTriangle,
    faImage,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CreateUpdateProject from "../Projects/CreateUpdateProject";
import CreateUpdateAccount from "../Accounts/CreateUpdateAccount";
import preventNonNumeric from "@/Utils/preventNonNumeric";
import Dropzone from "react-dropzone";

type Props = PropsWithChildren<
    | {
          type: "edit";
          day_log: DayLog;
          project_id?: never;
          client_id?: never;
      }
    | {
          type: "create";
          day_log?: never;
          project_id?: string;
          client_id?: string;
      }
>;

const payment_methods = [
    "UPI",
    "Card",
    "Net banking",
    "Bank Transfer",
    "Cheque",
];

const tableCellClasses = `p-4 pb-0`;
const tableHeaderClasses =
    "bg-default-100 uppercase text-default-500 text-xs font-bold !pb-4 " +
    tableCellClasses;

export default ({ children, project_id, day_log, type }: Props) => {
    const { projects, accounts } = usePage<PageProps>().props;

    const newProduct = (type: "business" | "others"): Product => ({
        id: Math.random().toString(),
        name: "",
        hsn_sac: "",
        unit: 0,
        uom: "",
        unit_price: 0,
        c_gst: 0,
        s_gst: 0,
        total: 0,
        type,
        purchase_id: "",
    });

    const [businessProducts, setBusinessProducts] = useState<Product[]>(
        day_log?.purchase.products.filter(
            (product) => product.type == "business",
        ) ?? [],
    );

    let businessProductsLength = 0;

    const saveBusinessProducts = <k extends keyof Product>(
        index: number,
        key: k,
        value: Product[k],
    ) => {
        setBusinessProducts((prev) => {
            const productsCopy = [...prev];
            const targetProduct = productsCopy[index];
            targetProduct[key] = value;
            if (typeof value == "number") {
                let subTotal;
                switch (key) {
                    case "c_gst":
                        subTotal =
                            targetProduct.unit * targetProduct.unit_price;
                        subTotal =
                            (targetProduct.s_gst / 100) * subTotal + subTotal;
                        targetProduct.total =
                            (value / 100) * subTotal + subTotal;
                        break;
                    case "s_gst":
                        subTotal =
                            targetProduct.unit * targetProduct.unit_price;
                        subTotal =
                            (targetProduct.c_gst / 100) * subTotal + subTotal;
                        targetProduct.total =
                            (value / 100) * subTotal + subTotal;
                        break;
                    case "unit":
                        subTotal = value * targetProduct.unit_price;
                        targetProduct.total =
                            (targetProduct.c_gst / 100) * subTotal +
                            (targetProduct.s_gst / 100) * subTotal +
                            subTotal;
                        break;
                    case "unit_price":
                        subTotal = value * targetProduct.unit;
                        targetProduct.total =
                            (targetProduct.c_gst / 100) * subTotal +
                            (targetProduct.s_gst / 100) * subTotal +
                            subTotal;
                        break;
                    default:
                        alert(`Unexpected key value: ${key}`);
                }

                return productsCopy;
            }
            targetProduct[key] = value;
            return productsCopy;
        });
    };

    const [otherproducts, setOtherProducts] = useState<Product[]>(
        day_log?.purchase.products.filter(
            (product) => product.type == "others",
        ) ?? [],
    );

    const saveOtherProducts = <k extends keyof Product>(
        index: number,
        key: k,
        value: Product[k],
    ) => {
        setOtherProducts((prev) => {
            const newProducts = [...prev];
            const targetProduct = newProducts[index];
            targetProduct[key] = value;
            return newProducts;
        });
    };

    const { data, setData, errors, post, put } = useForm<any>({
        type: "purchase",
        id: day_log?.id ?? "",
        project_id: day_log?.project_id ?? "",
        date: day_log?.date ?? "",
        work: day_log?.work ?? "",
        workers_count: day_log?.workers_count ?? 0,
        in: day_log?.in ?? "",
        out: day_log?.out ?? "",
        note: day_log?.note ?? "",
        images: day_log?.images ?? [],
        products: day_log?.purchase.products ?? [],
        transaction_id: day_log?.purchase.expense.transaction_id ?? "",
        account_id: day_log?.purchase.expense.transaction.account_id ?? "",
        amount: day_log?.purchase.expense.transaction.amount,
        payment_method:
            day_log?.purchase.expense.transaction.payment_method ?? "",
    });

    useEffect(() => {
        setData("products", [...businessProducts, ...otherproducts]);
    }, [businessProducts, otherproducts]);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const submit = () => {
        post(route("daylogs.store"), {
            onSuccess: () => alert("transaction recorded"),
            onError: (e) => console.log(e),
        });
    };

    const [images, setImages] = useState<DayLog["images"]>(
        day_log?.images ?? [],
    );
    useEffect(() => {
        setData("images", images);
    }, [images]);

    const thumbs = (
        <div className="grid grid-cols-4 gap-5 max-w-max">
            {images.map((image) => (
                <div
                    key={"preview" in image ? image.preview : image.path}
                    className="relative"
                >
                    <img
                        src={"preview" in image ? image.preview : image.path}
                        className="rounded-xl"
                    />
                    <Button
                        className="min-w-min absolute -top-4 -right-4 bg-danger-500 text-danger-foreground"
                        variant="flat"
                        onClick={() =>
                            setImages((prev: any) =>
                                prev.filter((item: any) =>
                                    "preview" in image
                                        ? image.preview != item.preview
                                        : image.path != item.path,
                                ),
                            )
                        }
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            ))}
        </div>
    );

    return (
        <>
            {cloneElement(children as any, { onClick: onOpen })}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className="max-w-screen-xl"
                scrollBehavior="inside"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Add day log
                    </ModalHeader>
                    <ModalBody>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid grid-cols-[1fr_max-content] gap-2 items-center">
                                <Autocomplete
                                    label="Select the Project"
                                    isInvalid={!!errors.project_id}
                                    errorMessage={errors.project_id}
                                    onSelectionChange={(e) =>
                                        setData("project_id", e.toString())
                                    }
                                    defaultSelectedKey={
                                        project_id ?? data?.project_id
                                    }
                                >
                                    {projects.map((project) => (
                                        <AutocompleteItem
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.name}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                <CreateUpdateProject type="create">
                                    <Button
                                        className="min-w-min h-full"
                                        color="primary"
                                        variant="flat"
                                    >
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                    </Button>
                                </CreateUpdateProject>
                            </div>
                            <Input
                                type="date"
                                label="Date"
                                placeholder="Enter date"
                                defaultValue={data.date}
                                onInput={(e) =>
                                    setData("date", e.currentTarget.value)
                                }
                                isInvalid={!!errors.date}
                                errorMessage={errors.date}
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <Input
                                type="time"
                                label="In time"
                                placeholder="Enter in time"
                                defaultValue={data.in}
                                onInput={(e) =>
                                    setData("in", e.currentTarget.value)
                                }
                                isInvalid={!!errors.in}
                                errorMessage={errors.in}
                            />
                            <Input
                                type="time"
                                label="Out time"
                                placeholder="Enter out time"
                                defaultValue={data.out}
                                onInput={(e) =>
                                    setData("out", e.currentTarget.value)
                                }
                                isInvalid={!!errors.out}
                                errorMessage={errors.out}
                            />
                            <Input
                                label="Work"
                                placeholder="Enter work"
                                defaultValue={data.out}
                                onInput={(e) =>
                                    setData("work", e.currentTarget.value)
                                }
                                isInvalid={!!errors.work}
                                errorMessage={errors.work}
                            />
                            <Input
                                type="number"
                                label="Workers count"
                                placeholder="Enter worker count"
                                defaultValue={data.workers_count.toString()}
                                onInput={(e) =>
                                    setData(
                                        "workers_count",
                                        Number(e.currentTarget.value),
                                    )
                                }
                                isInvalid={!!errors.workers_count}
                                errorMessage={errors.workers_count}
                            />
                        </div>
                        <h3>Business purchases</h3>
                        <div className="shadow border-default-900 rounded-xl p-4">
                            <div className="grid grid-cols-[max-content_1fr_repeat(8,max-content)] rounded-lg">
                                <p
                                    className={
                                        tableHeaderClasses + " rounded-s-xl"
                                    }
                                >
                                    Sno
                                </p>
                                <p className={tableHeaderClasses}>Name</p>
                                <p className={tableHeaderClasses}>HSN/SAC</p>
                                <p className={tableHeaderClasses}>Unit</p>
                                <p className={tableHeaderClasses}>UOM</p>
                                <p className={tableHeaderClasses}>Unit price</p>
                                <p className={tableHeaderClasses}>CGST</p>
                                <p className={tableHeaderClasses}>SGST</p>
                                <p className={tableHeaderClasses}>Total</p>
                                <p
                                    className={
                                        tableHeaderClasses + " rounded-e-xl"
                                    }
                                >
                                    Actions
                                </p>
                                {businessProducts.map((product, index) => (
                                    <>
                                        <p className={tableCellClasses}>
                                            {index + 1}
                                        </p>
                                        <div className={tableCellClasses}>
                                            <Textarea
                                                onChange={(e) =>
                                                    saveBusinessProducts(
                                                        index,
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                value={product.name}
                                                isInvalid={
                                                    !!errors[
                                                        `products.${index}.name`
                                                    ]
                                                }
                                                errorMessage={
                                                    !!errors[
                                                        `products.${index}.name`
                                                    ] &&
                                                    "Somethings wrong here^"
                                                }
                                            ></Textarea>
                                        </div>
                                        <div className={tableCellClasses}>
                                            <Input
                                                className="w-16"
                                                classNames={{
                                                    innerWrapper: "!mt-0",
                                                    input: "p-1",
                                                }}
                                                value={product.hsn_sac}
                                                onChange={(e) =>
                                                    saveBusinessProducts(
                                                        index,
                                                        "hsn_sac",
                                                        e.target.value,
                                                    )
                                                }
                                                isInvalid={
                                                    !!errors[
                                                        `products.${index}.hsn_sac`
                                                    ]
                                                }
                                                errorMessage={
                                                    !!errors[
                                                        `products.${index}.hsn_sac`
                                                    ] &&
                                                    "Somethings wrong here^"
                                                }
                                            />
                                        </div>
                                        <div className={tableCellClasses}>
                                            <Input
                                                onKeyDown={preventNonNumeric}
                                                className="w-16"
                                                classNames={{
                                                    innerWrapper: "!mt-0",
                                                    input: "p-1",
                                                }}
                                                value={product.unit.toString()}
                                                isInvalid={
                                                    !!errors[
                                                        `products.${index}.unit`
                                                    ]
                                                }
                                                errorMessage={
                                                    !!errors[
                                                        `products.${index}.unit`
                                                    ] &&
                                                    "Somethings wrong here^"
                                                }
                                                onChange={(e) =>
                                                    saveBusinessProducts(
                                                        index,
                                                        "unit",
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className={tableCellClasses}>
                                            <Input
                                                className="w-16"
                                                classNames={{
                                                    innerWrapper: "!mt-0",
                                                    input: "p-1",
                                                }}
                                                value={product.uom}
                                                isInvalid={
                                                    !!errors[
                                                        `products.${index}.uom`
                                                    ]
                                                }
                                                errorMessage={
                                                    !!errors[
                                                        `products.${index}.uom`
                                                    ] &&
                                                    "Somethings wrong here^"
                                                }
                                                onChange={(e) =>
                                                    saveBusinessProducts(
                                                        index,
                                                        "uom",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className={tableCellClasses}>
                                            <Input
                                                onKeyDown={preventNonNumeric}
                                                className="w-16"
                                                classNames={{
                                                    innerWrapper: "!mt-0",
                                                    input: "p-1",
                                                }}
                                                value={product.unit_price.toString()}
                                                isInvalid={
                                                    !!errors[
                                                        `products.${index}.unit_price`
                                                    ]
                                                }
                                                errorMessage={
                                                    !!errors[
                                                        `products.${index}.unit_price`
                                                    ] &&
                                                    "Somethings wrong here^"
                                                }
                                                onChange={(e) =>
                                                    saveBusinessProducts(
                                                        index,
                                                        "unit_price",
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className={tableCellClasses}>
                                            <Input
                                                onKeyDown={preventNonNumeric}
                                                className="w-16"
                                                classNames={{
                                                    innerWrapper: "!mt-0",
                                                    input: "p-1",
                                                }}
                                                value={product.c_gst.toString()}
                                                isInvalid={
                                                    !!errors[
                                                        `products.${index}.c_gst`
                                                    ]
                                                }
                                                errorMessage={
                                                    !!errors[
                                                        `products.${index}.c_gst`
                                                    ] &&
                                                    "Somethings wrong here^"
                                                }
                                                onChange={(e) =>
                                                    saveBusinessProducts(
                                                        index,
                                                        "c_gst",
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className={tableCellClasses}>
                                            <Input
                                                onKeyDown={preventNonNumeric}
                                                className="w-16"
                                                classNames={{
                                                    innerWrapper: "!mt-0",
                                                    input: "p-1",
                                                }}
                                                value={product.s_gst.toString()}
                                                isInvalid={
                                                    !!errors[
                                                        `products.${index}.s_gst`
                                                    ]
                                                }
                                                errorMessage={
                                                    !!errors[
                                                        `products.${index}.s_gst`
                                                    ] &&
                                                    "Somethings wrong here^"
                                                }
                                                onChange={(e) =>
                                                    saveBusinessProducts(
                                                        index,
                                                        "s_gst",
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                        </div>
                                        <p className={tableCellClasses}>
                                            {product.total}
                                        </p>
                                        <div className={tableCellClasses}>
                                            <Button
                                                className="min-w-min"
                                                color="danger"
                                                variant="flat"
                                                onClick={() => {
                                                    businessProductsLength--;
                                                    setBusinessProducts(
                                                        (prev) =>
                                                            prev.filter(
                                                                (_, j) =>
                                                                    index != j,
                                                            ),
                                                    );
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </Button>
                                        </div>
                                    </>
                                ))}
                            </div>
                            <Button
                                className="mt-4"
                                onClick={() => {
                                    businessProductsLength++;
                                    setBusinessProducts((prev) => {
                                        prev.push(newProduct("business"));
                                        return [...prev];
                                    });
                                }}
                            >
                                Add more
                            </Button>
                        </div>
                        <h3>Others purchases</h3>
                        <div className="shadow border-default-900 rounded-xl p-4">
                            <div className="grid grid-cols-[max-content_1fr_repeat(2,max-content)] rounded-lg">
                                <p
                                    className={
                                        tableHeaderClasses + " rounded-s-xl"
                                    }
                                >
                                    Sno
                                </p>
                                <p className={tableHeaderClasses}>Name</p>
                                <p className={tableHeaderClasses}>Total</p>
                                <p
                                    className={
                                        tableHeaderClasses + " rounded-e-xl"
                                    }
                                >
                                    Actions
                                </p>
                                {otherproducts.map((product, index) => (
                                    <>
                                        <p className={tableCellClasses}>
                                            {index + 1}
                                        </p>
                                        <div className={tableCellClasses}>
                                            <Textarea
                                                onChange={(e) =>
                                                    saveOtherProducts(
                                                        index,
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                value={product.name}
                                                isInvalid={
                                                    !!errors[
                                                        `products.${index + businessProductsLength}.name`
                                                    ]
                                                }
                                                errorMessage={
                                                    !!errors[
                                                        `products.${index + businessProductsLength}.name`
                                                    ] &&
                                                    "Somethings wrong here^"
                                                }
                                            ></Textarea>
                                        </div>
                                        <p className={tableCellClasses}>
                                            <Input
                                                onKeyDown={preventNonNumeric}
                                                className="w-16"
                                                classNames={{
                                                    innerWrapper: "!mt-0",
                                                    input: "p-1",
                                                }}
                                                value={product.total.toString()}
                                                isInvalid={
                                                    !!errors[
                                                        `products.${index + businessProductsLength}.total`
                                                    ]
                                                }
                                                errorMessage={
                                                    !!errors[
                                                        `products.${index + businessProductsLength}.total`
                                                    ] &&
                                                    "Somethings wrong here^"
                                                }
                                                onChange={(e) =>
                                                    saveOtherProducts(
                                                        index,
                                                        "total",
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                        </p>
                                        <div className={tableCellClasses}>
                                            <Button
                                                className="min-w-min"
                                                color="danger"
                                                variant="flat"
                                                onClick={() =>
                                                    setOtherProducts((prev) =>
                                                        prev.filter(
                                                            (_, j) =>
                                                                index != j,
                                                        ),
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </Button>
                                        </div>
                                    </>
                                ))}
                            </div>
                            <Button
                                className="mt-4"
                                onClick={() =>
                                    setOtherProducts((prev) => {
                                        prev.push(newProduct("others"));
                                        return [...prev];
                                    })
                                }
                            >
                                Add more
                            </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid grid-cols-[1fr_max-content] gap-2 items-center">
                                <Autocomplete
                                    label="Select the account"
                                    isInvalid={!!errors.account_id}
                                    errorMessage={errors.account_id}
                                    onSelectionChange={(e) =>
                                        setData("account_id", e.toString())
                                    }
                                    defaultSelectedKey={data.account_id ?? ""}
                                >
                                    {accounts.map((account) => (
                                        <AutocompleteItem
                                            key={account.id}
                                            value={account.id}
                                        >
                                            {account.name}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                <CreateUpdateAccount type="create">
                                    <Button
                                        className="min-w-min h-full"
                                        color="primary"
                                        variant="flat"
                                    >
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                    </Button>
                                </CreateUpdateAccount>
                            </div>
                            <Input
                                type="number"
                                label="Amount"
                                placeholder="Enter amount"
                                defaultValue={data.amount?.toString()}
                                onInput={(e) =>
                                    setData(
                                        "amount",
                                        Number(e.currentTarget.value),
                                    )
                                }
                                isInvalid={!!errors.amount}
                                errorMessage={errors.amount}
                            />
                            <Autocomplete
                                label="Select the payment method"
                                isInvalid={!!errors.payment_method}
                                errorMessage={errors.payment_method}
                                onSelectionChange={(e) =>
                                    setData("payment_method", e.toString())
                                }
                                defaultSelectedKey={data?.project_id}
                            >
                                {payment_methods.map((method) => (
                                    <AutocompleteItem
                                        key={method}
                                        value={method}
                                    >
                                        {method}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                        <Textarea
                            label="Note"
                            defaultValue={data.note}
                            onInput={(e) =>
                                setData("note", e.currentTarget.value)
                            }
                        ></Textarea>
                        <h3>Images</h3>
                        <Dropzone
                            onDrop={(acceptedFiles: any) => {
                                setImages((prev) => [
                                    ...prev,
                                    ...acceptedFiles.map((file: File) =>
                                        Object.assign(file, {
                                            preview: URL.createObjectURL(file),
                                        }),
                                    ),
                                ]);
                                console.log(acceptedFiles);
                            }}
                            accept={{ "image/*": [] }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div
                                        {...getRootProps()}
                                        className="grid place-items-center bg-default-100 hover:bg-default-200 py-8 rounded-xl text-default-500 mb-6"
                                    >
                                        <input {...getInputProps()} />
                                        <p>
                                            <FontAwesomeIcon icon={faImage} />
                                            &nbsp; Drag 'n' drop images here, or
                                            click to select images
                                        </p>
                                    </div>
                                    {thumbs}
                                </section>
                            )}
                        </Dropzone>
                    </ModalBody>
                    <ModalFooter>
                        <p
                            className={
                                errors.products
                                    ? "bg-danger-500 p-2 rounded-xl text-danger-foreground"
                                    : "hidden"
                            }
                        >
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                            &nbsp; Atleast one product is required to record a
                            purchase transaction
                        </p>
                        <Button
                            color="danger"
                            variant="shadow"
                            onPress={onClose}
                        >
                            Close
                        </Button>
                        <Button
                            color="primary"
                            variant="shadow"
                            onPress={submit}
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
