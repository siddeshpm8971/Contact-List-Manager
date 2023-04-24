export class EmployeeService{
    static EmployeeList=[
        {   
            id:1,
            name:'Siddesh PM',
            edu:'Computer Science Engineering',
            email:'siddeshpm@gMail.com',
            location:'Davanagere',
            isSelected:false
        },
        {   
            id:2,
            name:'Boodi Gouda',
            edu:'Mechanical Engineering',
            email:'boodi@gmail.com',
            location:'Ranebennuru',
            isSelected:false
        },
        {   
            id:3,
            name:'Erana Gouda',
            edu:' Civil Engineering',
            email:'eranagouda@gmail.com',
            location:'Shivamogga',
            isSelected:false
        },
        {   
            id:4,
            name:'Shamanth',
            edu:' Technical Engineering',
            email:'shamy@gmail.com',
            location:'Devanahalli',
            isSelected:false
        },
        {   
            id:5,
            name:'Sri Hari',
            edu:'Master Science',
            email:'srihari@gmail.com',
            location:'Basavanagudi',
            isSelected:false
        }
    ];

    static getAllEmployees(){
        return this.EmployeeList;
    }
}