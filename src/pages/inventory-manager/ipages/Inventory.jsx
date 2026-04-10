import {useState} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../iLayout";
import Sidebar from "../icomponents/iSidebar";

function Inventory({ items, setItems }){
    const location = useLocation();
    //Changing data inside the page

    const [item, setItem] = useState({
        id:"",
        name:"",
        quantity:"",
        productionDate:"",
        expiryDate:"",
        department:"",
        supplier:""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [filters, setFilters] = useState({
        search: "",
        department: "",
        expiryBefore: "",
        productionAfter: "",
        status: "",
    });

    const [editingItemId, setEditingItemId] = useState(null);

    function handleAddItem(){
        if (
            item.name.trim() === "" ||
            item.quantity === "" ||
            item.expiryDate === "" ||
            item.productionDate === "" ||
            item.department.trim() === "" ||
            item.supplier.trim() === ""
        ){
            setErrorMessage("Please fill in all fields.")
            return;
        }

        if (Number(item.quantity) <= 0) {
            setErrorMessage("Quantity must be greater than 0.");
            return;
        }
        
        if (item.expiryDate <= item.productionDate) {
            setErrorMessage("Expiration date must be after production date.");
            return;
            }

        
        if (editingItemId) {
        // EDIT MODE
            const updatedItems = items.map((i) =>
                i.id === editingItemId ? { ...item, id: editingItemId } : i
        );

            setItems(updatedItems);
            setSuccessMessage("Changes saved successfully.");
        } else {
            //  ADD MODE
            const newItem = {
                id: Date.now(),
                name: item.name,
                quantity: Number(item.quantity),
                productionDate: item.productionDate,
                expiryDate: item.expiryDate,
                department: item.department,
                supplier: item.supplier,
        };

            setItems([...items, newItem]);
            setSuccessMessage("Product added successfully.");
        }

        setItem({
            id:"",
            name:"",
            quantity:"",
            productionDate:"",
            expiryDate:"",
            department:"",
            supplier:""
        });

        setEditingItemId(null);
        setErrorMessage("");   
    }

    function handleRemoveItem(id){
        const updatedItems = items.filter((item)=> item.id !== id);
        setItems(updatedItems)
    }

    function getItemStatus(item){
        const todayString=new Date().toISOString().split("T")[0];
        const today = new Date();

        if (!item.expiryDate) {
            return "No Expiry Date";
        }
        const expiry = new Date(item.expiryDate);

        if (Number.isNaN(expiry.getTime())) {
            return "Invalid Date";
        }

        const timeDifference = expiry - today;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        if (Number(item.quantity)  === 0) {
            return "Out of Stock";
        }

        if (item.expiryDate < todayString) {
            return "Expired";
        }

        if (daysDifference <= 30) {
            return "Near Expiry";
        }


        if (Number(item.quantity)  <= 5) {
            return "Low Stock";
        }

        return "Valid";

    }

    const filteredItems = items.filter((item) =>{
        const matchesSearch =
            item.name.toLowerCase().includes(filters.search.toLowerCase());

        const matchesDepartment =
            item.department.toLowerCase().includes(filters.department.toLowerCase());

        const matchesExpiry =
            filters.expiryBefore === "" || item.expiryDate <= filters.expiryBefore;

        const matchesProduction =
            filters.productionAfter === "" || item.productionDate >= filters.productionAfter;

        const matchesStatus =
            filters.status === "" || getItemStatus(item) === filters.status;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesExpiry &&
            matchesProduction &&
            matchesStatus
        );
    });

    function handleEditItem(item) {
        setItem(item);
        setEditingItemId(item.id);
    }

    function handleCancelEdit() {
        setItem({
            id: "",
            name: "",
            quantity: "",
            productionDate: "",
            expiryDate: "",
            department: "",
            supplier: ""
        });

        setEditingItemId(null);
        setErrorMessage("");
        setSuccessMessage("");
    }

    function handleResetFilters() {
        setFilters({
            search: "",
            department: "",
            expiryBefore: "",
            productionAfter: "",
            status: "",
        });
    }
    useEffect(() => {
        if (location.state?.statusFilter) {
            setFilters((prev) => ({
                ...prev,
                status: location.state.statusFilter
            }));
        }
    }, [location.state]);

    const navigate = useNavigate();

    function handleLogout() {
        navigate("/");
    }

    return(
        <Layout>
            <div className="page-with-sidebar">
            <Sidebar />
            <div className="main-content-area">
        <div className="page-container">
        <div className="inventory-header">
            <div>
                <h1 className="brand-title">Inventory</h1>
                <p className="brand-subtitle">Manage products, stock, and expiry status</p>
            </div>

        
        </div>

        <div className="card">
            <h2>Filters</h2>

            <div className="filters-grid">
                <input
                    type="text"
                    placeholder="Search by item name"
                    value={filters.search}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            search: e.target.value,
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Filter by department"
                    value={filters.department}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            department: e.target.value,
                        })
                    }
                />

                <input
                    type="date"
                    value={filters.expiryBefore}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            expiryBefore: e.target.value,
                        })
                    }
                />

                <input
                    type="date"
                    value={filters.productionAfter}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            productionAfter: e.target.value,
                        })
                    }
                />

                <select
                    value={filters.status}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            status: e.target.value,
                        })
                    }
                >
                    <option value="">All Status</option>
                    <option value="Valid">Valid</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Near Expiry">Near Expiry</option>
                    <option value="Expired">Expired</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>

                <button onClick={handleResetFilters}>Reset Filters</button>
            </div>
        </div>

        <div className="card">
            <h2>{editingItemId ? "Edit Item" : "Add New Item"}</h2>

            <div className="form-grid">
                <input
                    type="text"
                    placeholder="Enter item name"
                    value={item.name}
                    onChange={(event) =>
                        setItem({
                            ...item,
                            name: event.target.value,
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Enter quantity"
                    value={item.quantity}
                    onChange={(event) =>
                        setItem({
                            ...item,
                            quantity: event.target.value,
                        })
                    }
                />

                <input
                    type="date"
                    value={item.productionDate}
                    onChange={(e) =>
                        setItem({
                            ...item,
                            productionDate: e.target.value,
                        })
                    }
                />

                <input
                    type="date"
                    value={item.expiryDate}
                    onChange={(e) =>
                        setItem({
                            ...item,
                            expiryDate: e.target.value,
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Enter department name"
                    value={item.department}
                    onChange={(event) =>
                        setItem({
                            ...item,
                            department: event.target.value,
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Enter supplier name"
                    value={item.supplier}
                    onChange={(event) =>
                        setItem({
                            ...item,
                            supplier: event.target.value,
                        })
                    }
                />
            </div>

            <div className="actions-row">
                <button onClick={handleAddItem}>
                    {editingItemId ? "Save Changes" : "Add Item"}
                </button>

                {editingItemId && (
                    <button onClick={handleCancelEdit}>Cancel Edit</button>
                )}
            </div>

            {errorMessage && <p className="message-error">{errorMessage}</p>}
            {successMessage && <p className="message-success">{successMessage}</p>}
        </div>

        <div className="card">
            <div className="inventory-list-header">
                <h2>Inventory List</h2>
                <p className="muted-text">Showing {filteredItems.length} items</p>
            </div>

            {filteredItems.length === 0 && <p>No results found.</p>}

            <div className="inventory-items">
                {filteredItems.map((item) => (
                    <div key={item.id} className="list-item">
                        <div className="item-main-info">
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p>Production Date: {item.productionDate}</p>
                            <p>Expiry Date: {item.expiryDate}</p>
                            <p>Department: {item.department}</p>
                            <p>Supplier: {item.supplier}</p>
                        </div>

                        <div className="item-side-info">
                            <span className={`status-badge status-${getItemStatus(item).toLowerCase().replace(/\s+/g, "-")}`}>
                                {getItemStatus(item)}
                            </span>

                            <div className="actions-row">
                                <button onClick={() => handleEditItem(item)}>Edit</button>
                                <button onClick={() => handleRemoveItem(item.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
    </div>
    </Layout>
    );
}

export default Inventory;