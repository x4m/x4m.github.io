using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace generator
{
    class Program
    {
        static void Main(string[] args)
        {
            var pattern = File.ReadAllText("..\\..\\..\\..\\pattern.html");
            var labFiles = Directory.GetFiles("..\\..\\..\\..\\Labs", "*.txt");
            var labSections = labFiles
                .Select(f=>new{text = File.ReadAllText(f,Encoding.Default),caption = Path.GetFileNameWithoutExtension(f)})
                .OrderBy(f=>f.caption)
                .Select(f=>FormatLab(f.caption,f.text));
            var lecFiles = Directory.GetFiles("..\\..\\..\\..\\Lectures", "*.txt");
            var lecSections = lecFiles
                .Select(f => new { text = File.ReadAllText(f, Encoding.Default), caption = Path.GetFileNameWithoutExtension(f) })
                .OrderBy(f => f.caption)
                .Select(f => FormatSection(f.caption, f.text));
            var output = //string.Format(pattern, string.Join("", labSections), string.Join("", lecSections));
                pattern.Replace("{0}", string.Join("", labSections)).Replace("{1}", string.Join("", lecSections));
            File.WriteAllText("..\\..\\..\\..\\program.html", output);
        }

        private static string FormatLab(string caption, string text)
        {
            var strings = text.Split(new []{Environment.NewLine},StringSplitOptions.RemoveEmptyEntries);

            return "<div class=\"expandable\"><p><strong>" + strings[0] + "</strong> <br/>" + string.Join("<br/>", strings.Skip(1).Select(HttpUtility.HtmlEncode)) + "</p><hr/></div>" + Environment.NewLine;
        }

        private static string FormatSection(string caption, string text)
        {
            var week = caption.Substring(0,2);

            var estimatedWeekNumber = int.Parse(week)-1;

            var dateTime = new DateTime(2015,02,9);
            return string.Format("<div class=\"expandable\"><p> Неделя <strong>{0}</strong>[{5}] Занаятие <strong>{1}</strong> Тема <strong>{2}</strong> <br/>{3}</p><hr/></div>{4}", 
                week, 
                caption.Substring(2,2), 
                caption.Substring(5), 
                text.Replace(Environment.NewLine,"<br/>"), 
                Environment.NewLine,
                dateTime.AddDays(7*estimatedWeekNumber).ToLongDateString()
                );
        }
    }
}
