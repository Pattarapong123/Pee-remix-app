export default function MyProfile(){
    return (
        <>
        <div className="p-5 m-5 border-2 border-red-600 rounded">
            <h1 className="text-x1 font-bold text-amber-700">Profile</h1>
            <ul className="list-disc list-inside"> </ul>
            <h1>
            Name: Pattarapong Tangngam
                  </h1>
               <strong>
                  026640491611-3
           </strong>
        
        </div>
        <MyEducation />
        </>
    );
}

function MyEducation(){
    return(
        <div className="p-5 m-5 border-2 border-red-600 rounded">
            <h1 className="text-x1 font-bold text-amber-700">Educations</h1>
            <ul className="list-disc list-inside">
                <li>Information Tecnology,Rmutto, 2567-Present</li>
                <li>Xxxx,xxxx,999-999</li>
                <li>Xxxx,yyyy,999-999</li>

            </ul>
        </div>

    );
}

//export default MyProfile
