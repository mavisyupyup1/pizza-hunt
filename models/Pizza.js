const {Schema, model}=require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName:{
        type:String
    },
    createdBy:{
        type: String
    },
    createdAt:{
        type:Date,
        default: Date.now,
        get:(createdAtVal)=> dateFormat(createdAtVal)
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
        virtuals:true,
        getters:true
    },
    id:false
}
);

//get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function(){
    return this.comments.reduce((total,comment)=>total+ comment.replies.length +1,0);
});
//cerate the Pizza model using the PizzaSchema
const Pizza =model('Pizza',PizzaSchema);

//export the Pizza model
module.exports = Pizza;