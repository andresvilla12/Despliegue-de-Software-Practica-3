using System;
using System.Web;

public class Health : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Healthy");
        context.Response.StatusCode = 200;
    }

    public bool IsReusable
    {
        get { return false; }
    }
}