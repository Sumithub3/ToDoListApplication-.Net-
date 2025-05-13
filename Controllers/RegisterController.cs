using NestedToDoApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NestedToDoApplication.Controllers
{
    public class RegisterController : Controller
    {
        TD_SampleDBEntities db = new TD_SampleDBEntities();
        // GET: Register
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(MASTERUSER user)
        {
            if(ModelState.IsValid == true)
            {
                db.sp_InsertUser(user.Username, user.LastName, user.UPassword);
            }
            
            return View();
        }
    }
}