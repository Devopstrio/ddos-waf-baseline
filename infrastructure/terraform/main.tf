provider "azurerm" {
  features {}
}

provider "aws" {
  region = var.aws_region
}

resource "azurerm_resource_group" "security" {
  name     = "rg-${var.project_name}-security-${var.environment}"
  location = var.location
}

# --- Global Edge Protection (Azure Front Door) ---

resource "azurerm_cdn_frontdoor_profile" "edge" {
  name                = "afd-security-edge-${var.environment}"
  resource_group_name = azurerm_resource_group.security.name
  sku_name            = "Premium_AzureFrontDoor"
}

resource "azurerm_cdn_frontdoor_firewall_policy" "waf" {
  name                              = "wafsecurityedge${var.environment}"
  resource_group_name               = azurerm_resource_group.security.name
  sku_name                          = azurerm_cdn_frontdoor_profile.edge.sku_name
  enabled                           = true
  mode                              = "Prevention"
  redirect_url                      = "https://error.devopstrio.com/blocked"
  custom_block_response_status_code = 403

  managed_rule {
    type    = "DefaultRuleSet"
    version = "1.0"
    action  = "Block"
  }

  managed_rule {
    type    = "Microsoft_BotManagerRuleSet"
    version = "1.0"
    action  = "Block"
  }
}

# --- AWS WAF Foundation ---

resource "aws_wafv2_web_acl" "main" {
  name     = "waf-security-baseline-${var.environment}"
  scope    = "REGIONAL"
  
  default_action {
    allow {}
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "waf-security-baseline"
    sampled_requests_enabled   = true
  }
}

# --- Security Control Plane (AKS) ---

resource "azurerm_kubernetes_cluster" "security_k8s" {
  name                = "aks-security-iq-${var.environment}"
  location            = azurerm_resource_group.security.location
  resource_group_name = azurerm_resource_group.security.name
  dns_prefix          = "security-k8s"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D2s_v3"
  }

  identity {
    type = "SystemAssigned"
  }
}
