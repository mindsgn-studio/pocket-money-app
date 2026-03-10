package ethereum

import (
	"context"
	"testing"
)

func TestSendTokenWithMode_RejectsAutoInSponsoredOnly(t *testing.T) {
	ctx := context.Background()
	db := openTestDB(t)
	defer db.Close()

	// Create a wallet so SendTokenWithMode passes "no wallet found".
	if _, err := CreateNewEthereumWallet(ctx, db, "Test"); err != nil {
		t.Fatalf("CreateNewEthereumWallet() error = %v", err)
	}

	_, err := SendTokenWithMode(ctx, db, "ethereum-sepolia", "usdc", "0x0000000000000000000000000000000000000002", "1", "", "", SendModeAuto)
	if err == nil || err.Error() != "sponsored_only_mode_enforced" {
		t.Fatalf("expected sponsored_only_mode_enforced, got %v", err)
	}
}

func TestSendTokenWithMode_RejectsDirectInSponsoredOnly(t *testing.T) {
	ctx := context.Background()
	db := openTestDB(t)
	defer db.Close()

	if _, err := CreateNewEthereumWallet(ctx, db, "Test"); err != nil {
		t.Fatalf("CreateNewEthereumWallet() error = %v", err)
	}

	_, err := SendTokenWithMode(ctx, db, "ethereum-sepolia", "usdc", "0x0000000000000000000000000000000000000002", "1", "", "", SendModeDirect)
	if err == nil || err.Error() != "sponsored_only_mode_enforced" {
		t.Fatalf("expected sponsored_only_mode_enforced, got %v", err)
	}
}
