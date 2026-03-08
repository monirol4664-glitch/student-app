export default async function Home() {

 const res = await fetch(
   "https://student-app-api.workers.dev/courses"
 )

 const courses = await res.json()

 return (
  <div className="p-10">

   <h1 className="text-3xl font-bold">
     Student App Courses
   </h1>

   {courses.map((course:any)=>(
     <div key={course.id} className="border p-4 mt-4">
        <h2>{course.title}</h2>
        <p>{course.code}</p>
     </div>
   ))}

  </div>
 )
}