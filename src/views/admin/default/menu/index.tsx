import { restaurantService } from "services/restaurantService";

import { AuthContext, useAuth } from "context/AuthProvider";
import { useEffect, useState } from "react";
import { menuService } from "services/menuService";

import { MdAddLocationAlt, MdAddShoppingCart, MdLocalPhone, MdMail, MdModeEditOutline } from "react-icons/md";

import image1 from "assets/img/profile/equis.jpg";
import image2 from "assets/img/profile/plato.jpg";
import { Restaurant } from "models/Restaurant";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { useCart } from "context/cartProvider";
import Swal from "sweetalert2";
import { Product } from "models/Product";
import { productService } from "services/productService";

const MenuView = () => {
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState<Restaurant>({});

    const [menu, setMenu] = useState([]);
    const [products, setProducts] = useState<Product[]>([]);


    const [piana, setPiana] = useState(0);


    const { id: restaurant_id } = useParams();

    const { addProduct, deleteProduct } = useCart();


    const fetchData = async () => {
        setRestaurant(await restaurantService.getRestaurantByID(parseInt(restaurant_id)));

        let menuData = (Object as any).groupBy(
            await menuService.getMenus(),
            (e: any) => e.restaurant.id);

        Object.keys(menuData).forEach((key) => {
            menuData[key] = menuData[key].map((e: any) => ({
                id: e.id,
                product_id: e.product.id,
                product_name: e.product.name,
                price: e.product.price,
                description: e.product.description,
                availability: e.availability
            }))
        });

        setMenu(window.structuredClone(menuData[parseInt(restaurant_id + "")] ?? []));

        const prods = await productService.getProducts()
        setProducts(prods);
    }

    useEffect(() => {
        fetchData();
    }, [piana]);

    const handleAdd = async (id: any, product: any) => {
        console.log("adding to cart:", id);

        Swal.fire({
            title: "Añadir al carrito",
            text: "Está seguro de querer agregar esto a su carrito?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, agregar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                addProduct(product);
            }
        });
    }

    const handleDelete = async (menu_id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "Está seguro de querer eliminar el registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await menuService.deleteMenu(menu_id);
                if (success) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "El menú se ha eliminado",
                        icon: "success"
                    });
                }

                fetchData();
            }
        });
    };

    const handleAddMenu = async () => {
        const inputOptions = products.reduce((options: any, product: any) => {
            options[product.id] = `${product.name} - $${product.price}`;
            return options;
        }, {});

        const { value: product_id } = await Swal.fire({
            title: 'Selecciona un producto para añadir al menú',
            input: 'select',
            inputOptions,
            inputPlaceholder: 'Elige un producto',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value) {
                        resolve();
                    } else {
                        resolve('Debes seleccionar un producto');
                    }
                });
            }
        });

        if (product_id) {
            menuService.createMenu({
                restaurant_id,
                product_id,
                availability: true,
                price: (await productService.getProductByID(product_id)).price
            })

            fetchData();

            setPiana(piana + 1);
        }
    }

    const switchAvailable = async (menu: any) => {

        await menuService.updateMenu(menu.id, {
            availability: !menu.availability
        })
        fetchData();
    }

    return (
        <div className="mt-5" >
            <div className="grid grid-cols-1 gap-3" >
                <div key={restaurant.id} className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <div className="flex items-center">
                        <div className="">
                            <img className="h-[183px] w-[183px] rounded-lg" src={image1} alt="" />
                        </div>
                        <div className="ml-4">
                            <p className="text-4xl font-bold text-navy-700 dark:text-white">
                                {restaurant.name}
                            </p>
                            <div className="mt-2 text-sm text-gray-600 flex flex-col gap-1">
                                <p className="flex flex-row gap-2" >
                                    <MdAddLocationAlt /> {restaurant.address}
                                </p>

                                <p className="flex flex-row gap-2" >
                                    <MdMail /> {restaurant.email || "Correo no disponible"}
                                </p>

                                <a
                                    className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white  flex flex-row items-center gap-2"
                                >
                                    <MdLocalPhone /> {restaurant.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => handleAddMenu()}
                    className={"m-2 py-2 px-4 text-white rounded-md bg-blue-500 hover:bg-blue-600 flex items-center justify-center flex-row font-bold gap-2"}
                >
                    <Plus size={20} /> {/* Ícono de crear */}
                    Añadir nuevo producto al menú
                </button>

                {menu.map((product) => (
                    <div key={product.id} className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <div className="flex items-center">
                            <div className="">
                                <img className="h-[83px] w-[83px] rounded-lg" src={image2} alt="" />
                            </div>
                            <div className="ml-4">
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    {product.product_name}
                                </p>
                                <p className="mt-2 text-sm text-gray-600 flex flex-row items-center gap-1">
                                    {product.price}$ - {product.description}
                                </p>
                            </div>
                        </div>
                        <div className="mr-4 ml-4 flex items-center justify-center text-gray-600 dark:text-white gap-2">
                            <button
                                className="text-red-600 dark:text-red-500"
                                onClick={() => product.id !== undefined && handleDelete(product.id)}
                            >
                                <Trash2 size={30} /> {/* Ícono de eliminar */}
                            </button>

                            <button
                                className="hidden"
                                onClick={() => product.product_id !== undefined && handleAdd(product.product_id, product)}
                            >
                                <MdAddShoppingCart size={40} /> {/* Ícono de eliminar */}
                            </button>

                            <button
                                onClick={() => switchAvailable(product)}
                                className={"m-2 py-2 px-4 text-white rounded-md bg-blue-500 hover:bg-blue-600 flex items-center justify-center flex-row font-bold gap-2"}
                            >
                                {product.availability ? "Disponible" : "Agotado"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuView;
