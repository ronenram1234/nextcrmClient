import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GlobalProps } from "../App";
import { User, UserAdmin } from "../interfaces/User";
import { errorMsg } from "../services/feedbackService";
import { getAllUsersDetail } from "../services/userServices";
import ClipLoader from "react-spinners/ClipLoader";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

interface AdminUsersProps {}

const AdminUsers: FunctionComponent<AdminUsersProps> = () => {
  const { token } = useContext(GlobalProps);
  const [usersArray, setUsersArray] = useState<User[]>([]);
  const [userAdmins, setuserAdmins] = useState<UserAdmin[]>([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      document.body.classList.add("cursor-loading");
    } else {
      document.body.classList.remove("cursor-loading");
    }
  }, [loading]);
 
  useEffect(() => {
    setLoading(true);
    getAllUsersDetail(token)
      .then((res) => {
        setUsersArray(res.data);
        
        setLoading(false);
      })
      .catch((err) => {
        errorMsg(`Transaction Error - ${err.response.data}`);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    const userAdminsTmp: UserAdmin[] = usersArray.map((user) => ({
      id: user._id || "",
      nameFirst: user.name.first || "",
      nameMiddle: user.name.middle || "",
      nameLast: user.name.last || "",
      phone: user.phone || "",
      email: user.email || "",
      imageUrl: user.image.url || "",
      addressState: user.address.state || "",
      addressCountry: user.address.country || "",
      addressCity: user.address.city || "",
      addressStreet: user.address.street || "",
      addressHouseNumber: user.address.houseNumber || 0,
      addressZip: user.address.zip || 0,
      isAdmin: user.isAdmin ? "Yes" : "No",
      isBusiness: user.isBusiness ? "Yes" : "No",
      createdAt: new Date(user.createdAt),
    }));
    setuserAdmins(userAdminsTmp)
  }, [usersArray]);

  // Updated columns without the fullName column
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 130,
    },
    {
      field: "nameFirst",
      headerName: "First Name",
      width: 130,
    },
    {
      field: "nameMiddle",
      headerName: "Middle Name",
      width: 130,
    },
    {
      field: "nameLast",
      headerName: "Last Name",
      width: 130,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 160,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
    {
      field: "imageUrl",
      headerName: "Image URL",
      width: 200,
    },
    {
      field: "addressState",
      headerName: "State",
      width: 120,
    },
    {
      field: "addressCountry",
      headerName: "Country",
      width: 120,
    },
    {
      field: "addressCity",
      headerName: "City",
      width: 120,
    },
    {
      field: "addressStreet",
      headerName: "Street",
      width: 180,
    },
    {
      field: "addressHouseNumber",
      headerName: "House Number",
      width: 120,
    },
    {
      field: "addressZip",
      headerName: "ZIP Code",
      width: 120,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
    },
    {
      field: "isBusiness",
      headerName: "Business",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
       type: 'dateTime',
      valueFormatter: (params) => {
        const date = new Date(params);
      return date.toLocaleDateString("en-US");
      },
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <p className="h1 text-center fw-bolder">
        {loading ? "Loading..." : "Users Table"}
      </p>

      {loading ? (
        <div className="spinner-container">
          <ClipLoader loading={loading} size={50} color="#00bcd4" />
        </div>
      ) : (
        <>
          <Paper
            sx={{ height: "70vh", width: "100%", border: "2px solid #000" }}
          >
            <DataGrid
              rows={userAdmins}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
            />
          </Paper>
        </>
      )}
    </>
  );
};

export default AdminUsers;
