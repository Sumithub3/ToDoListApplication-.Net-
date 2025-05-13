using NestedToDoApplication.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Deployment.Internal;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NestedToDoApplication.Controllers
{
    public class TodoListController : Controller
    {
        TD_SampleDBEntities db = new TD_SampleDBEntities();
        // GET: TodoList
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult AllTodoList()
        {
            
            int userid = Convert.ToInt32(Session["userid"]);
            var getlist = db.sp_SelectTASKLIST(userid);
            var sublist = getlist.Select(s => new {sid=s.ToDoListID, sub = s.TDName });
            return Json(sublist, JsonRequestBehavior.AllowGet);    
        }
        [HttpPost]
        public JsonResult AddTodoList(string tdName)
        {
            int userid = Convert.ToInt32(Session["userid"]);
            db.sp_InsertTASKLIST(tdName, userid);
            return Json("Success", JsonRequestBehavior.DenyGet); ;
        }
        
        

        public JsonResult DeleteTodoList(int sid)
        {
            //int userid = Convert.ToInt32(Session["userid"]);
            db.sp_DeleteTASKLIST(sid);
            return Json("Success", JsonRequestBehavior.AllowGet); 
        }
    }
}