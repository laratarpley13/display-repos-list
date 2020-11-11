'use strict';


function displayResults(responseJson) {
    console.log(responseJson);
    $("#results-list").empty();
    for (let i=0; i<responseJson.length; i++) {
        $("#results-list").append(`
        <li>
            <h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
        </li>
        `);
    }
    $("#results").removeClass('hidden');
}

function getRepos(usernameSearch) {
    //make url from base url and the usernameSearch
    const baseUrlOne = "https://api.github.com/users/";
    const baseUrlTwo = "/repos";
    const url = baseUrlOne.concat(usernameSearch, baseUrlTwo);
    //console.log url to make sure it's working
    console.log(url);
    //fetch info from the api (using url)
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => alert("Something went wrong."));
}

function watchForm() {
    //on form submit
    $('form').submit(event => {
        //prevent default
        event.preventDefault();
        //turn form input into variable
        const usernameSearch = $("#username-search").val();
        //call getRepos(usernameSearch) function
        getRepos(usernameSearch);
    });        
}

$(watchForm);