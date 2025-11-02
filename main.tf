provider "google" {
  project     = var.project
  region      = var.region
  zone        = var.zone
  credentials = var.credentials_file
}

resource "google_compute_network" "vpc_network" {
  name                    = "onlinecourses-network"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  name          = "onlinecourses-subnet"
  ip_cidr_range = "10.0.0.0/24"
  region        = var.region
  network       = google_compute_network.vpc_network.id
}

resource "google_compute_firewall" "allow_nodejs" {
  name    = "allow-nodejs"
  network = google_compute_network.vpc_network.id

  allow {
    protocol = "tcp"
    ports    = ["22", "3000", "80"]
  }

  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_instance" "onlinecourseVM" {
  name         = "onlinecoursevm"
  machine_type = var.machine_type
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12"
    }
  }

  network_interface {
    network    = google_compute_network.vpc_network.id
    subnetwork = google_compute_subnetwork.subnet.id
    access_config {}
  }
}
