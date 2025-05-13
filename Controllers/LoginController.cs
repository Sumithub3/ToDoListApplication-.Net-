using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NestedToDoApplication.Models;

namespace NestedToDoApplication.Controllers
{
    public class LoginController : Controller
    {
        TD_SampleDBEntities db = new TD_SampleDBEntities();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(MASTERUSER user)
        {
            if(ModelState.IsValid == true)
            {
                var com = db.sp_MasterGetUser(user.Username, user.UPassword);
                var loggeduser = com.Select(n => n.USERID).ToList();
                var valid = loggeduser.Count > 0;
                if (!valid) 
                {
                    ViewBag.ErrorMessage = "UserID or Password wrong.";
                    return View();
                }
                else
                {
                    
                    Session["username"] = user.Username;
                    Session["userid"] = loggeduser[0];
                    return RedirectToAction("Index", "TodoList");
                }
            }
            return View();
        }
       

    }
}