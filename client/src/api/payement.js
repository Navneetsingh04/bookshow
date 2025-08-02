import axios from "./_api";

export const payment = async ( ) => {
    return await axios.post("/payment/orders")
}
