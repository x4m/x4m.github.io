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
            var labSections = labFiles.Select(f=>new{text = File.ReadAllText(f,Encoding.Default),caption = Path.GetFileNameWithoutExtension(f)}).Select(f=>FormatSection(f.caption,f.text));
            var lecFiles = Directory.GetFiles("..\\..\\..\\..\\Lectures", "*.txt");
            var lecSections = lecFiles.Select(f => new { text = File.ReadAllText(f, Encoding.Default), caption = Path.GetFileNameWithoutExtension(f) }).Select(f => FormatSection(f.caption, f.text));
            var output = //string.Format(pattern, string.Join("", labSections), string.Join("", lecSections));
                pattern.Replace("{0}", string.Join("", labSections)).Replace("{1}", string.Join("", lecSections));
            File.WriteAllText("..\\..\\..\\..\\program.html", output);
        }

        private static string FormatSection(string caption, string text)
        {
            return "<div class=\"expandable\"><p>" + caption + " <br>" + text.Replace(Environment.NewLine,"<br/>") + "</p><br/></div>" + Environment.NewLine;
        }
    }
}
