import { defineField } from "sanity";

export default defineField({
    name: "product",
    type: "document",
    title: "Product",
    fields: [
        { name: "name", type: "string", title: "Name" },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: "name", // Automatically generate the slug from the name
                maxLength: 96,  // Limit the slug length
            },
        },
        { name: "description", type: "text", title: "Description" },
        { name: "price", type: "number", title: "Price" },
        { name: "discountPercent", type: "number", title: "Discount Percent" },
        { name: "tags", type: "array", title: "Tags", of: [{ type: "string" }] },
        { name: "sizes", type: "array", title: "Sizes", of: [{ type: "string" }] },
        { name: "colors", type: "array", title: "Colors", of: [{ type: "string" }] },
        { name: "isNew", type: "boolean", title: "Is New" },
        {
            name: "image",
            type: "image",
            title: "Image",
            options: { hotspot: true },
        },
    ],
});
