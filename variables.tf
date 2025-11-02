variable "project" {
  description = "ID du projet Google Cloud"
  type        = string
}

variable "region" {
  description = "La région Google Cloud à utiliser"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "La zone de la région"
  type        = string
  default     = "us-central1-a"
}


variable "machine_type" {
  description = "Le type de machine à utiliser pour la VM"
  type        = string
  default     = "e2-micro"
}

variable "credentials_file" {
  description = "Chemin du fichier de credentials pour GCP"
  type        = string
  default     = "terraform-on-gcp-476812-9f79bac2fcc1.json"
}
