import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LayoutAdmin from '../layouts/LayoutAdmin.tsx';
import LayoutCashier from '../layouts/LayoutCashier.tsx';
import Home from '../view/Home.tsx';
import Dashboard from '../view/Dashboard.tsx';
import ManageUser from '../view/ManageUser.tsx';
import ManageMenu from '../view/ManageMenu.tsx';
import ManageTable from '../view/ManageTable.tsx';
import ManageBill from '../view/ManageBill.tsx';
import ManageBillCashier from '../view/ManageBillCashier.tsx';
import BillCashier from '../view/Bill.tsx';
import EditBillCashier from '../view/EditBill.tsx';
import Payment from '../view/payment.tsx';
import EditOder from '../view/EditOrder.tsx';
import AddUser from '../view/Adduser.tsx';
import EditUser from '../view/EditUser.tsx';
import ChangPassword from '../view/change-password.tsx';

function AppRoutes({ role }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {role === 'admin' && (
        <>
          <Route path="/admin/dashboard" element={<LayoutAdmin><Dashboard /></LayoutAdmin>} />
          <Route path="/admin/manage-user" element={<LayoutAdmin><ManageUser /></LayoutAdmin>} />
          <Route path="/admin/manage-menu" element={<LayoutAdmin><ManageMenu /></LayoutAdmin>} />
          <Route path="/admin/manage-table" element={<LayoutAdmin><ManageTable /></LayoutAdmin>} />
          <Route path="/admin/manage-bill" element={<LayoutAdmin><ManageBill /></LayoutAdmin>} />
          <Route path="/admin/add-user" element={<LayoutAdmin><AddUser /></LayoutAdmin>} />
          <Route path="/admin/edit-user" element={<LayoutAdmin><EditUser /></LayoutAdmin>} />
          <Route path="/admin/change-password" element={<LayoutAdmin><ChangPassword /></LayoutAdmin>} />

        </>
      )}

      {role === 'cashier' && (
        <>
          <Route path="/cashier/home" element={<LayoutCashier><Home /></LayoutCashier>} />
          <Route path="/cashier/manage-bill-cashier" element={<LayoutCashier><ManageBillCashier /></LayoutCashier>} />
          <Route path="/cashier/bill" element={<LayoutCashier><BillCashier /></LayoutCashier>} />
          <Route path="/cashier/manager-bill" element={<LayoutCashier><EditBillCashier /></LayoutCashier>} />
          <Route path="/cashier/payment" element={<LayoutCashier><Payment /></LayoutCashier>} />
          <Route path="/cashier/edit-order" element={<LayoutCashier><EditOder /></LayoutCashier>} />

        </>
      )}

      <Route
        path="*"
        element={
          role === 'admin' ? (
            <Navigate to="/admin/dashboard" replace />
          ) : role === 'cashier' ? (
            <Navigate to="/cashier/home" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default AppRoutes;
