await Listing.findByIdAndUpdate(id, { ...req.body.listing });
req.body.listing  // accept ki gai request k body me ek object hai jiska naam listing hai
//is function ka mtab hai ki jis bhi listing k id se given id match ho jaye usme req.body.listing jo ki ek object
//hai use past kr do or jo bhi key exapmle : "title"  repeate ho rahi hai usk old existing value ko update krke req.body.listing
// k title vali value ko insert krdo

