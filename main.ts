import file from './data/Detection.json' with { type: "json" };
import lightFormat from "https://deno.land/x/date_fns@v2.15.0/lightFormat/index.js";
const exportDate:{"pages":{"title": string, "lines": string[]}[]} = {
    "pages": [
    ]
}

const format = "yyyy-MM-dd";
file.map(
    (item) => {
        const page:{"title":string, "lines": string[]} = {"title": "", "lines": []};

        const title = item.title
        const date_notISO = item.issued?.["date-parts"][0].join("-");
        const formatted_date = date_notISO ? lightFormat(new Date(date_notISO), format) : "";

        const GetDOI = item.DOI;
        const DOI = GetDOI ? `https://doi.org/${GetDOI}` : "";

        const Authors = item.author?.map(
            (author) => "\t" + "#" + author.given + "_" + author.family
        )

        const abstract = ">" + item.abstract

        page.title = title
        page.lines = [
            title,
            "[論文.icon]",
            DOI,
            "",
            "Date",
            "\t" + formatted_date,
            "",
            "Abstract",
            abstract,
            "",
            "",
            "",
            "Authors"
        ]
        if (Authors) {
            page.lines.push(...Authors)
        }

        exportDate.pages.push(page)
    }
)

console.log(exportDate)

const jsonString = JSON.stringify(exportDate, null, 2);
const filePath = "./data/output.json";
await Deno.writeTextFile(filePath, jsonString);
console.log(`JSONデータがファイルに出力されました: ${filePath}`);
