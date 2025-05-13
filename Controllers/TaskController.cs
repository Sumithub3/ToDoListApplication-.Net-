using NestedToDoApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace NestedToDoApplication.Controllers
{
    
    public class TaskController : Controller
    {
        TD_SampleDBEntities db = new TD_SampleDBEntities();
        // GET: Task
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult SubjectMappedTaskList(int mappedlistid)
        {

            int userid = Convert.ToInt32(Session["userid"]);
            var get_task_list = db.sp_SelectTASKAlongWithList(mappedlistid, userid);
            var tsklist = get_task_list.Select(s => new { TaskID= s.TaskID, Tname = s.TaskName, Tstatus = s.TaskStatus ,lstID=s.MappedListID });
            return Json(tsklist, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AddTask(string tdName, int mappedlistid)
        {
            //var entitiesToUpdate = db.MappingTaskLists.Where(entity => entity.TaskID == taskid);

            //foreach (var entity in entitiesToUpdate)
            //{
            //    entity.Added_On_Column_Name = DateTime.Now;
            //    entity.Update_Column_Name = DateTime.Now;
            //}
            //db.SaveChanges();
            int userid = Convert.ToInt32(Session["userid"]);
            db.sp_InsertTASK(tdName, 0, mappedlistid, userid);
            return Json("Success", JsonRequestBehavior.DenyGet); ;
        }
        public JsonResult EditTask(int id)
        {
            var task = db.MappingTaskLists.Where(t => t.TaskID == id)
                        .Select(t => new { t.TaskName });
            return Json(task, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateTask(string taskName, int status, int taskid)
        {
            //var entitiesToUpdate = db.MappingTaskLists.Where(entity => entity.TaskID == taskid);

            //foreach (var entity in entitiesToUpdate)
            //{
            //    entity.Update_Column_Name = DateTime.Now; 
            //}
            //db.SaveChanges();
            db.sp_UpdateTASKAlongWithList(taskName, status, taskid);
            return Json(status, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteTask(int tskid)
        {
            int userid = Convert.ToInt32(Session["userid"]);
            db.sp_DeleteTASKAlongWithList(tskid, userid);   
            return Json("Success", JsonRequestBehavior.AllowGet);
        }
    }
}
