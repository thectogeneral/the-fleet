terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  credentials = file("auth.json")
  project     = "powerlabs-431219"
  region      = "us-east1" 
}

resource "google_app_engine_application" "default" {
  location_id = "us-east1"
}

resource "google_sql_database_instance" "default" {
  name           = "my-postgres-instance"
  database_version = "POSTGRES_14"
  deletion_protection = false
  settings {
    tier = "db-f1-micro"
  }
}

output "cloud_sql_connection_name" {
  value = google_sql_database_instance.default.connection_name
}