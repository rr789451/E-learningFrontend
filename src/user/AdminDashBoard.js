import React from 'react';
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { 
        user: {name, email, role} 
    } = isAutheticated();

    const adminLeftSide = () => {
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success">Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-success">Create Courses</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-success">Manage Courses</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return (
            <div> 
                <div className="card mb-4">
                    <h4 className="card-header">Admin Information</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="badge bg-success mr-2">Name:</span> {name}
                        </li>
                        <li className="list-group-item">
                            <span className="badge bg-success mr-2">E-Mail:</span> {email}
                        </li>
                        <li className="list-group-item">
                            <span className="list-group-item list-group-item-action list-group-item-danger">Admin Area</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <Base title="Welcome to Admin Dashboard" description="Manage all of your Courses" className="container bg-success p-4">
            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
        </Base>
    )
}

export default AdminDashboard;