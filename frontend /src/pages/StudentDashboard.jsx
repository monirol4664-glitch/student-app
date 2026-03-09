export default function StudentDashboard(){

const user = JSON.parse(localStorage.getItem("user"))

return(

<div>

<h2>Student Dashboard</h2>

<p>Name: {user.name}</p>
<p>Email: {user.email}</p>

</div>

)

}