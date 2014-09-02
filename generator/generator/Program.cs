using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            return "<div class=\"expandable\"><p>" + strings[0] + " <br>" + string.Join("<br/>",strings.Skip(1)) + "</p><br/></div>" + Environment.NewLine;
        }

        private static string FormatSection(string caption, string text)
        {

            return string.Format("<div class=\"expandable\"><p> Неделя {0} Занаятие {1} Тема {2} <br>{3}</p><br/></div>{4}", 
                caption.Substring(0,2), 
                caption.Substring(2,2), 
                caption.Substring(5), 
                text.Replace(Environment.NewLine,"<br/>"), 
                Environment.NewLine);
        }
    }
}
