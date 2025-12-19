import dayjs from "dayjs";

export default function DeliveryDate({ cartItem, deliveryOptions }) {
    const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
        return deliveryOption.id === cartItem.deliveryOptionId;
    });
    return (
        <div className="delivery-date">
            Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
        </div>
    );
}
