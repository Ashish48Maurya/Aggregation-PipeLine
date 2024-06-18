const express = require('express');
const mongoConnect = require('./db');
const app = express();
const PORT = 8000;
const User = require('./model')
const Book = require('./bookModel')
// const emp = require('./emp.json')

app.get('/', async (req, res) => {
    // const data = await User.insertMany(emp); 


    //count Number of docs
        // const data = await User.find({}).countDocuments(); 



    // const data = await User.aggregate([

        // {
        //find Avg age of users
            // $group: {
            //     _id: "$gender",
            //     avgAge: {
            //         $avg: "$age"
            //     }
            // }

            // $group: {
            //     _id: null,
            //     avgAge: {
            //         $avg: "$age"
            //     }
            // }

            // $group: {
            //     _id: "male",
            //     avgAge: {
            //         $avg: "$age"
            //     }
            // }
        // }



    //List top 5 most common fav fruits among the users
        // {
        //     $group:{
        //         _id:"$favoriteFruit",
        //         count:{
        //             $sum: 1
        //         }
        //     }
        // },
        // {
        //     $sort:{
        //         count:-1
        //     }
        // },
        // {
        //     $limit:2    //5 for 5 fruits
        // }



        
    //find total no. of males and females
        // {
        //     $group:{
        //         _id:"$gender",
        //         count:{
        //             $sum:1
        //         }
        //     }
        // }


    //Which country has the highest no. of registered users
        // {
        //     $group:{
        //         _id:"$company.location.country",
        //         count:{
        //             $sum:1
        //         }
        //     }
        // },
        // {
        //     $sort:{
        //         count:-1
        //     }
        // },
        // {
        //     $limit:1
        // }

    
    //List all unique eye color present in collection
        // {
        //     $group:{
        //         _id:"$eyeColor",
        //         count:{
        //             $sum :1
        //         }
        //     }
        // }
    

    //What is the avg number of tags per users : unwind is used when your are working with array
        // {
        //     $unwind: "$tags"
        // },
        // {
        //     $group:{
        //         _id:"$_id",
        //         count:{
        //             $sum:1
        //         }
        //     }
        // },
        // {
        //     $group:{
        //         _id:null,
        //         avgTags:{
        //             $avg:"$count"
        //         }
        //     }
        // }


    //How many users have 'enim' as one of their tags?
        // {
        //     $match:{
        //         tags:'enim',
        //     }
        // },
        // {
        //     $count:"UsersWithEnimTag"
        // }


    //What are the names and age of the users who are inactive and have 'velit' as a tag?
        // {
        //     $match:{
        //         tags:"velit" , isActive: false
        //     }
        // },
        // {
        //     $project:{ //which field u want to project from the above fetched data
        //         name:1,
        //         age:1
        //     }
        // }


    //How many users have a phone number starting with '+1(940)'?


    //Who has registerd the most recently
        // {
        //     $sort:{
        //         registered:-1
        //     }
        // },
        // {
        //     $limit:4
        // },
        // {
        //     $project:{
        //         name:1,
        //         registered:1,
        //         _id:0
        //     }
        // }

    
    //Categorize users by their Fav Fruit
        // {
        //     $group:{
        //         _id:"$favoriteFruit",
        //         users:{$push: "$name"} //push opterator push the specified field in the array
        //     }
        // }

    

    //How many users have 'ad' as the second tag in their tags Array/List
        // {
        //     $match:{
        //         "tags.1":"ad" //tags.1 => at first index of tags
        //     }
        // },
        // {
        //     $count:"TotalCount"
        // }


    
    //Users who have both 'enim' and 'id' as thier tags
        // {
        //     $match:{
        //         tags:{$all:['enim','id']}
        //     }
        // }



    //List all companies located in the USA with their corresponding user count
        // {
        //     $match:{
        //         "company.location.country":"USA"
        //     }
        // },
        // {
        //     $group:{
        //         _id: "$company.title",
        //         count:{
        //             $sum:1
        //         }
        //     }
        // }

    // ])


    const data = await Book.aggregate([
        {
            $lookup:{
                from:"authors",  //from which collection you want to look values
                foreignField:"_id", //name of the foreign key you are looking for
                localField:"author_id",//name of the field in which value of foreign key in your local collection is present 
                as:"result",//name the output of this pipeline result
            }
        },
        {
            $addFields:{
                result:{
                    $first:"$result" //what it does : first only extract first index value from the array given to him
                }
            }
        }
    ])

    return res.status(200).json({ data });
})

app.listen(PORT, async () => {
    await mongoConnect();
    console.log(`Server Running At Port http://localhost:${PORT}`);
})