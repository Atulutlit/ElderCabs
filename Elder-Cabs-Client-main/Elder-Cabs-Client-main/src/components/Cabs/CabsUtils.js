export const finalFare = (cabFare, totalFare, advancePercent, gst) => {

    let tripFare = totalFare,
        finalFare = 0,
        advancePayment = 0;

    // add gst in cab fare
    cabFare += cabFare * (gst / 100);

    // total fare
    finalFare = Math.ceil(cabFare + tripFare);

    // advance fare
    advancePayment = Math.ceil(finalFare * (advancePercent / 100));

    return { finalFare, advancePayment };
}
