import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GlobalProps } from "../App";

import ClipLoader from "react-spinners/ClipLoader";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Paper from "@mui/material/Paper";
import { CardAdmin, CardRecFull } from "../interfaces/Card";
import { checkAddress } from "../services/cardServices";

interface AdminCardsProps {}

const AdminCards: FunctionComponent<AdminCardsProps> = () => {
  const { cardArray, imageError, addressError, setAddressError } =
    useContext(GlobalProps);
  const [cards, setCards] = useState<CardAdmin[]>([]);

  const handleChaeckAddress = async (card: CardRecFull): Promise<boolean> => {
    try {
      const res =
        await checkAddress(`${card.address.street}, ${card.address.city},   ${card.address.state || ""} ${card.address.zip}
    ${card.address.country}`);
      if (res.data.status === "OK") {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("bad address", card.address, err);
      return false;
    }
  };

  useEffect(() => {
    if (cardArray !== null) {
      const validateAddress = async () => {
        const updatedAddressError: string[] = [];
        await Promise.all(
          cardArray.map(async (card) => {
            const isValid = await handleChaeckAddress(card);
            if (!isValid) {
              updatedAddressError.push(card._id);
            }
          })
        );
        setAddressError(updatedAddressError);
      };

      validateAddress();
    }
  }, [cardArray, setAddressError]);

  useEffect(() => {
    if (cardArray !== null) {
      const cardAdmins: CardAdmin[] = cardArray.map((card) => ({
        id: card._id || "",
        title: card.title || "",
        subtitle: card.subtitle || "",
        description: card.description || "",
        phone: card.phone || "",
        email: card.email || "",
        url: card.web || "",
        state: card.address.state || "",
        country: card.address.country || "",
        city: card.address.city || "",
        street: card.address.street || "",
        houseNumber: card.address.houseNumber || 0,
        zip: card.address.zip || 0,
        bizNumber: card.bizNumber || 0,
        likesNumber: card.likes ? card.likes.length : 0,
        user_id: card.user_id || "",
        createdAt: new Date(card.createdAt) || "",
        imageError: imageError.includes(card._id) ? "true" : "",
        addressError: addressError.includes(card._id) ? "true" : "",
      }));

      setCards(cardAdmins);
    }
  }, [cardArray,addressError,imageError]);


  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (loading) {
      document.body.classList.add("cursor-loading");
    } else {
      document.body.classList.remove("cursor-loading");
    }
  }, [loading]);

  const columns: GridColDef<CardAdmin>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "subtitle",
      headerName: "Subtitle",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "imageError",
      headerName: "Image Error",
      width: 100,
    },
    {
      field: "addressError",
      headerName: "Address Error",
      width: 100,
    },
    {
      field: "likesNumber",
      headerName: "Number Of Likes",
      width: 150,
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
      field: "url",
      headerName: "Website",
      width: 180,
    },
    {
      field: "imageUrl",
      headerName: "Image URL",
      width: 200,
    },
    {
      field: "addressCity",
      headerName: "City",
      width: 120,
    },
    {
      field: "addressCountry",
      headerName: "Country",
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
      field: "bizNumber",
      headerName: "Business Number",
      width: 150,
    },
   
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      type: "dateTime",
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
        {loading ? "Loading..." : "Cards Table"}
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
              rows={cards}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 20]}
              sx={{ border: 0 }}
            />
          </Paper>
        </>
      )}
    </>
  );
};

export default AdminCards;
