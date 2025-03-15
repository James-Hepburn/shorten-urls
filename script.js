var url = "https://o5l680ciqi.execute-api.us-east-1.amazonaws.com/prod/shorten";

document.querySelector ("form").addEventListener ("submit", async function (event) {
    event.preventDefault ();

    var long = document.getElementById ("url").value;
    var link = document.getElementById ("link");

    try {
        var response = await fetch (url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify ({long_url: long}),
        });

        if (!response.ok) throw new Error ("Failed to shorten URL.");

        var raw = await response.json ();
        var data = raw.body ? JSON.parse (raw.body) : raw;

        if (data.short_url) {
            link.innerHTML = `
                Shortened URL: <a href="${data.short_url}" target="_blank">${data.short_url}</a>
            `;
        } else {
            throw new Error("Shortened URL not found in response.");
        }
    } catch (error) {
        link.textContent = "Error: Could not shorten the URL.";
    }
});
