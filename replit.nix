{ pkgs }: {
  # ... your existing dependencies ...

  # Configure nginx to use your custom 404 page
  services.nginx.http.server[0].locations = {
    "/": {
      root = "./public";  # Assuming your files are in a 'public' folder
      errorPage = { 404 = "/404.html"; };
    };
  };
}