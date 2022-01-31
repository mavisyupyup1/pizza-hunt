const {Schema, model}=require('mongoose');

const PizzaSchema = new Schema({
    pizzaName:{
        type:String
    },
    createdBy:{
        type: String
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    size:{
        type:String,
        default:'Large'
    },
    comments:[
        {
            type:Schema.Types.ObjectId,
            // tells Pizza model where to search to find the right comments
            ref:'Comment'
        }
    ],
    toppings:[],

},{
    toJSON:{
        virtuals:true
    },
    id:false
}
);

//get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function(){
    return this.comments.length;
});
//cerate the Pizza model using the PizzaSchema
const Pizza =model('Pizza',PizzaSchema);

//export the Pizza model
module.exports = Pizza;